(() => {
const sample=document.getElementById("sample"), input=document.getElementById("typing-input"), start=document.getElementById("start-test");
if(!sample||!input||!start)return;
const passage=sample.textContent.trim(); let remaining=60, startedAt=null, timer=null, finished=false;
const timeEl=document.getElementById("time"), wpmEl=document.getElementById("wpm"), accuracyEl=document.getElementById("accuracy"), message=document.getElementById("test-message");
function update(){const typed=input.value, correct=[...typed].filter((ch,i)=>ch===passage[i]).length, elapsed=startedAt?Math.max(1,(Date.now()-startedAt)/60000):1;wpmEl.textContent=Math.round(correct/elapsed);accuracyEl.textContent=typed.length?Math.round(correct/typed.length*100):100;}
function finish(){if(finished)return;finished=true;clearInterval(timer);input.disabled=true;message.textContent="Test complete. Your score is "+wpmEl.textContent+" WPM.";fetch("/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({wpm:Number(wpmEl.textContent),accuracy:Number(accuracyEl.textContent)})}).catch(()=>{message.textContent+=" Your score could not be saved.";});}
start.addEventListener("click",()=>{clearInterval(timer);remaining=60;startedAt=null;finished=false;input.value="";input.disabled=false;input.focus();timeEl.textContent=remaining;wpmEl.textContent="0";accuracyEl.textContent="100";message.textContent="";});
input.addEventListener("input",()=>{if(finished)return;if(!startedAt){startedAt=Date.now();timer=setInterval(()=>{remaining--;timeEl.textContent=remaining;update();if(remaining<=0)finish();},1000);}update();if(input.value.length>=passage.length)finish();});
})();