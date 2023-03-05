import http from './http';

export async function usesug(url:any,path:any,param:any) {
  const res: any = await http.get(`biying/qsonhs.aspx?type=cb&q=${param}`, {
  });
  console.log(res);
  return res;
}

export async function usesearch(url:any,path:any,param:any) {
  const res: any = await http.get(`${path + param}`, {
  });
  console.log(res);
  return res;
}
