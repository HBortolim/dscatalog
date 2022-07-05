package com.hmbsoftwares.dscatalog.dto;

import com.hmbsoftwares.dscatalog.services.validation.UserInsertValid;
import com.hmbsoftwares.dscatalog.services.validation.UserUpdateValid;

import java.io.Serializable;

@UserUpdateValid
public class UserUpdateDTO extends UserDTO implements Serializable {

}
