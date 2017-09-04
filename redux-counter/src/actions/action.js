/*action 类型*/
export const INCREASE_NUM = 'INCREASE_NUM';
export const DECREASE_NUM = 'DECREASE_NUM';


export function increase(){
	return {type:INCREASE_NUM};
}

export function decrease(){
	return {type:DECREASE_NUM};
}