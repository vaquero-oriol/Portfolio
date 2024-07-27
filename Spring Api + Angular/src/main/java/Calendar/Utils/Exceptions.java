package Calendar.Utils;

public class Exceptions extends RuntimeException{
    public static class InvalidDataException extends RuntimeException {
        public InvalidDataException(String message) {
            super(message);
        }
    }

    public static class UserAlreadyExistsException extends RuntimeException {
        public UserAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class ServiceException extends RuntimeException {
        public ServiceException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    public static class UserDoesntExistException extends RuntimeException{
        public UserDoesntExistException (String message){
            super(message);
        }
    }
    public static class CredentialsDoesntMatch extends RuntimeException{
        public CredentialsDoesntMatch (String message){
            super(message);
        }
    }
}
