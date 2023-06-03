import bcrypt from 'bcryptjs'

export const  hashFunction = ({
    payload='',
    saltRound = +process.env.SALT_ROUND
}) =>{
    if (payload == '') {
        return false
    }
    const hash = bcrypt.hashSync(payload,saltRound)
    return hash

}

export const  compareFunction = ({
    payload='',
    refrencedata= ''
})  => {
    if (payload =='' || refrencedata =='') {
        return false
    }
    const compare = bcrypt.compareSync(payload,refrencedata);
    return compare
}