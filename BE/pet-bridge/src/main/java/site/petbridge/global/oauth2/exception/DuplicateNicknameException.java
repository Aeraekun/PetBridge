package site.petbridge.global.oauth2.exception;

import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;

public class DuplicateNicknameException extends PetBridgeException {

    public static final DuplicateNicknameException EXCEPTION = new DuplicateNicknameException();

    public DuplicateNicknameException() {super(ErrorCode.DUPLICATE_NICKNAME);}
}
