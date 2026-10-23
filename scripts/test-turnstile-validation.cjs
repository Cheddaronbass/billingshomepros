// Offline unit tests for the production Turnstile helper. No real tokens,
// network traffic, or secrets are used.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

async function main(){
 const file=fs.readFileSync(path.join(process.cwd(),"app/lib/turnstile.js"),"utf8");
 const {verifyTurnstileToken}=await import("data:text/javascript;base64,"+Buffer.from(file).toString("base64"));
 const oldSite=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,oldSecret=process.env.TURNSTILE_SECRET_KEY;
 const oldFetch=globalThis.fetch;
 let assertions=0;
 function check(condition){assert.equal(condition,true);assertions++}
 try{
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  delete process.env.TURNSTILE_SECRET_KEY;
  let result=await verifyTurnstileToken(undefined,"quote_request");
  check(result.ok===true&&result.configured===false);
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY="test-public";
  result=await verifyTurnstileToken(undefined,"quote_request");
  check(result.ok===false&&result.status===503);
  process.env.TURNSTILE_SECRET_KEY="test-secret";
  result=await verifyTurnstileToken("","quote_request");
  check(result.ok===false&&result.status===400);
  result=await verifyTurnstileToken("x".repeat(2049),"quote_request");
  check(result.ok===false&&result.status===400);

  function mockResponse(action,hostname,success=true){
   globalThis.fetch=async (url,opts)=>{
    check(url==="https://challenges.cloudflare.com/turnstile/v0/siteverify");
    check(opts.method==="POST");
    check(opts.body.get("secret")==="test-secret");
    check(opts.body.get("response")==="valid-user-token");
    return {ok:true,json:async()=>({success,action,hostname})};
   };
  }
  mockResponse("quote_request","billingshomepros.com");
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===true&&result.configured===true);

  mockResponse("quote_request","www.billingshomepros.com");
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===true);

  mockResponse("contractor_request","billingshomepros.com");
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===false&&result.status===400);

  mockResponse("quote_request","attacker.example");
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===false&&result.status===400);

  mockResponse("quote_request","billingshomepros.com",false);
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===false&&result.status===400);

  globalThis.fetch=async()=>({ok:false,status:503});
  result=await verifyTurnstileToken("valid-user-token","quote_request");
  check(result.ok===false&&result.status===503);

  console.log("BHP_TURNSTILE_UNIT_TEST "+JSON.stringify({passed:true,checks:assertions}));
 }finally{
  globalThis.fetch=oldFetch;
  if(oldSite===undefined)delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY=oldSite;
  if(oldSecret===undefined)delete process.env.TURNSTILE_SECRET_KEY;
  else process.env.TURNSTILE_SECRET_KEY=oldSecret;
 }
}
main().catch(e=>{console.error("BHP_TURNSTILE_TEST_FAILED",e.stack||e.message);process.exitCode=1});
