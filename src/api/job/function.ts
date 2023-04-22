export function getJobStatus(status:number):string{
  switch (status) {
    case 0:return "未开始";
    case 1:return "执行中";
    case 2:return "已完成";
    case 3:return "已撤销";
    case 4:return "作业失败";
    default:return "";
  }
}