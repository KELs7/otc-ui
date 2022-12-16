import BigNumber from "bignumber.js";
BigNumber.config({ RANGE: [-30, 30], EXPONENTIAL_AT: 1e9 });
BigNumber.set({ DECIMAL_PLACES: 30, ROUNDING_MODE: BigNumber.ROUND_DOWN });

const isNumber = (val)=>{
    if(isNaN(val)){
        return false
    }else{
        return true;
    };
}

const isFloat = (val)=>{
    if(val%1>0){
        return true
    }else{
        return false;
    };
}

export const encodeNumber = (val) => {
    if (!isNumber(val)) throw new Error(`Error encoding`);;
    if (isFloat(val)) {
      if (!BigNumber.isBigNumber(val)) val = new BigNumber(val);
      return { __fixed__: val.toFixed(30).replace(/^0+(\d)|(\d)0+$/gm, "$1$2") };
    } else{
        return parseInt(val)
    }
 };
