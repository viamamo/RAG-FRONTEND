import {requestPost} from "./util/commons";

export function test(){
  requestPost('/test/receive2',"").then((data)=>{
    console.log(data.data)
  });
}