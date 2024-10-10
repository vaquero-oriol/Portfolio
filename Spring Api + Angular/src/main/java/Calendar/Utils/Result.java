package Calendar.Utils;

public class Result<T> {
    private final T value;
    private final String error;
    private final  boolean succes;
    private Result(T value, String error, boolean succes){
        this.value=value;
        this.error=error;
        this.succes= succes;
    }
    public static <T> Result<T> Success(T value){
        return new Result<>(value,null,true);
    }

    public static <T> Result<T>Failure(String error){
        return new Result<>(null,error,false);
    }
    public T getValue(){
        if(!succes){
            throw new IllegalStateException("Cannot get a value from a failure result");
        }
        return value;
    }
    public String getError(){
        if(succes){
            throw new IllegalStateException("Cannot get an error from a succesfull result");
        }
        return error;
    }
    public boolean isSucces(){
        return succes;
    }
    public boolean isFailure(){
        return !succes;
    }
}
