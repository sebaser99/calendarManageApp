import { fetchSinToken, fetchConToken } from "../../helpers/fetch";


describe('vamos a probar el fetch', ()=> {
    let token = '';

    test('fetch debe funcionar', async ()=> {
        const res = await fetchSinToken('auth', {email:'sebaser99@yahoo.com', password:'1234567'}, 'POST')
        expect(res instanceof Response).toBe(true)

        const body = await res.json()
        expect(body.ok).toBe(true)
        token = body.token;
        console.log(token)
    })

    test('fetch con token debe funcionar', async ()=> {
        localStorage.setItem('token', token)
        const resp = await fetchConToken('events/622249b5f2010520cc9ae1e4', {}, 'DELETE')
        const body = await resp.json()
    
        expect(body.msg).toBe('No existe un evento con ese Id')
    })
})