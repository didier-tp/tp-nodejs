export function carre(x:number) :number{
    return x*x;
}

export function racineCarree(x:number):number{
    return Math.sqrt(x);
}

function add(x:number,y:number){
    return x+y;
}

export default {
    name : 'calcul',
    add : add
}
