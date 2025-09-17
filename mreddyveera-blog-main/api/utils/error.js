//if expoprting sinle function no need of the curly brackets
const errorHandler= (statusCode,message)=>{
    const error=new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
};
export default errorHandler;