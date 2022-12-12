let rlnumber="";
let operands=[];
let operator="";
let Invalid=false,
operandNotFirst=false,
consecOperator=false,
equal=false;

function createNumbersPad(){
    const numPad=document.querySelector("#numberPad");
    for (let i=1;i<12;i++){
        const buttonNum=document.createElement("button");
        buttonNum.className="numPad";
        numPad.appendChild(buttonNum);
        if(i==10){
            buttonNum.textContent=0;
            buttonNum.id=`num0`;
        }else if(i==11){
            buttonNum.textContent=".";
            buttonNum.id="dot";
        }else{
            buttonNum.textContent=i;
            buttonNum.id=`num${i}`;
        }   
        buttonNum.addEventListener("click",()=>{
            operandNotFirst=true;
            saveInput(buttonNum);
        })  
    }
}

function createOperatorsPad(){
    const oprPad=document.querySelector("#oprPad");
    const ops={"del":"DEL","clr":"AC","mul":"\u00D7",
    "divd":"\u00F7","add":"+","sub":"-","posNeg":"+/-","eq":"="};
    for(const op in ops){
        const buttonOpr=document.createElement("button");
        oprPad.appendChild(buttonOpr);
        buttonOpr.className="oprPad";
        buttonOpr.textContent=ops[op];
        buttonOpr.id=op;
        buttonOpr.addEventListener("click",()=>{
            if(buttonOpr.id=="clr") clear();
            else if(!Invalid && operandNotFirst){
                if(buttonOpr.id=="del") backspace();
                else if (buttonOpr.id=="eq") equals(buttonOpr);
                else if (buttonOpr.id=="posNeg") operate(buttonOpr.id);
                else fourOps(buttonOpr);
            } 
        })  
    }    
}
function saveInput(buttonNum){
    consecOperator=false;
    if(!Invalid) {
        if(buttonNum.id=="dot")
            displayValue(buttonNum.textContent);
        else if(buttonNum.id=="posNeg")
            displayValue("-");
        else if (buttonNum.id.includes("num")) 
            displayValue(buttonNum.textContent);
    }
}

function fourOps(buttonOpr){
    consecOperator=true;
    equal=false;
    if(rlnumber !="") {
        takeInput();
        if(operands.length==2) equals(buttonOpr);  
    }
    operator=buttonOpr.id;
}

function equals(buttonOpr){
    const display=document.querySelector("#Display");
    if (buttonOpr.id=="eq"){
        equal=true;
        if(consecOperator) error("1");
        else if(operator=="") {
            operate("eq",+(display.textContent));
            rlnumber="";
        }
        else{
            takeInput();
            operate(operator,+operands[0],+operands[1]);
        }
        operator="";
    }else operate(operator,+operands[0],+operands[1]);
    
}

function takeInput(){
    const display=document.querySelector("#Display");
    operands.push(rlnumber);
    rlnumber="";
}

function displayValue(value){
    const display=document.querySelector("#Display");
    let dis=display.textContent;
    if(equal==true){
        operands=[];
        equal=false;
    }
    if(rlnumber.length!=22){
        if(value=="0"){
            if(rlnumber.startsWith("0.")||!rlnumber.startsWith("0")||rlnumber==""){
                rlnumber+=value;
                display.textContent=rlnumber;
            }
        }else if(value=="."){
            if(!rlnumber.includes(".")){
                if(rlnumber=="") rlnumber+="0."
                else rlnumber+=value;
                display.textContent=rlnumber;
            }
        }else if(1<+value<10){
            if(rlnumber=="0") rlnumber=value;
            else rlnumber+=value;
            display.textContent=rlnumber;
        }
    }
}

function clear(){
    const display=document.querySelector("#Display");
    Invalid=false;
    display.textContent="0";
    rlnumber="";
    operands=[];
    operator="";
    operandNotFirst=false;
}

function backspace(){
    const display=document.querySelector("#Display");
    if(rlnumber.length!=0) {
        rlnumber=rlnumber.slice(0,-1);
        if(rlnumber!="") display.textContent=rlnumber;
        else display.textContent="0";
    }
}

function Add(operand1,operand2){
    let sum=operand1+operand2;
    return sum;
}

function Subtract(operand1,operand2){
    let diff=operand1-operand2;
    return diff;
}

function Multiply(operand1,operand2){
    let prod=operand1*operand2;
    return prod;
}

function Divide(operand1,operand2){
    let quo=operand1/operand2;
    return quo;
}  

function operate(operator, operand1, operand2){
    const display=document.querySelector("#Display");
    switch(operator){
        case "add":
            let sum=Add(operand1,operand2);
            checkResult(sum);
            updateInterRes(sum);
            break;
        case "sub":
            let diff=Subtract(operand1,operand2);
            checkResult(diff);
            updateInterRes(diff);
            break;
        case "mul":
            let prod=Multiply(operand1,operand2);
            checkResult(prod);
            updateInterRes(prod);
            break;
        case "divd":
            let quo=Divide(operand1,operand2);
            checkResult(quo);
            updateInterRes(quo);
            break;
        case "eq":
            displayResult(operand1);
        case "posNeg":
            if (rlnumber!="" && +rlnumber!=0){
                if(rlnumber.charAt(0)=="-") rlnumber=rlnumber.slice(1);
                else rlnumber="-"+rlnumber;
                display.textContent=rlnumber;
            }
            
    }
}

function checkResult(res){
    let check=resultValid(res);
    if (check=="valid"){
        if(!Number.isInteger(res)) res=res.toFixed(5);
        displayResult(res);
    }
}
function error(code){
    const display=document.querySelector("#Display");
    switch (code){
        case "1":
            display.textContent="Invalid Operation. Press AC to continue.";
            break;
        case "2":
            display.textContent="ERROR! Sorry, number cannot be represented.";
            break;
    }
    Invalid=true;
}
    
function resultValid(value){
    if (value==Infinity) error("1");
    else if (value.toString.length>22) error("2");
    else return "valid";
}

function displayResult(value){
    const display=document.querySelector("#Display");
    display.textContent="";
    display.textContent=value;
}

function updateInterRes(res){
    operands=[];
    operands.push(String(res));
}
createNumbersPad();
createOperatorsPad();
