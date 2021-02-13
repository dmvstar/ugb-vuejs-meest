public class sha512 {
public static void main (String args[])
{
    System.out.println("Hello, World!");

    String operationName = "operationName";
    String login = "login";
    
    String applicationSecretKey = "applicationSecretKey";
    String sumStr = transactionId + login + operationName;

    String encodedSum = java.security.MessageDigest.getInstance("SHA-512")
        .digest(sumStr.getBytes("UTF-8"))
        .encodeBase64()
        .toString();

    String checkStr = encodedSum + applicationSecretKey;
    System.out.println ( java.security.MessageDigest.getInstance("SHA-512")
        .digest(checkStr.getBytes("UTF- 8")
            .encodeBase64()
            .toString() ));
}
}