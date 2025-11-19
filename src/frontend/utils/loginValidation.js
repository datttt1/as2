export function validateUsername(username){
    if(!username || username.trim()===''){
        return 'Username không được để trống'
    }
    if(username.trim().length < 3 )
        return 'Username phải có ít nhất 3 ký tự'

    if(username.trim().length>50)
        return 'Username không được quá 50 ký tự'

    if(username.includes(' '))
        return 'Username không được chứa khoảng trắng';

    if(/[^a-zA-Z0-9-_.]/.test(username))
        return 'Username không được chứa ký tự đặc biệt ngoài "." "-" "_"';

    return null;

}

export function validatePassword(password){
    if(!password || password.trim()===''){
        return 'Password không được để trống'
    }
    if(password.trim().length < 6 )
        return 'Password phải có ít nhất 6 ký tự';

    if(password.trim().length > 100)
        return 'Password không được quá 100 ký tự';

    if(!(/[a-zA-Z]/.test(password) && /[0-9]/.test(password)))
    {
        return 'Password phải có cả chữ và số'

    }

    return null;

}


