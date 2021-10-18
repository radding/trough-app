const user = require("./user")
// @ponicode
describe("user.usersReducers", () => {
    test("0", () => {
        let callFunction = () => {
            user.usersReducers({}, { user: { headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" } }, team: "bc23a9d531064583ace8f67dad60f6bb", type: "number" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            user.usersReducers("Florida", { user: { headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" } }, team: "bc23a9d531064583ace8f67dad60f6bb", type: "number" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            user.usersReducers({}, { user: { headers: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E" }, team: 9876, type: "number" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            user.usersReducers({}, { user: { headers: { User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" } }, team: "bc23a9d531064583ace8f67dad60f6bb", type: "LOGOUT" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            user.usersReducers("Florida", { user: { headers: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E" }, team: "bc23a9d531064583ace8f67dad60f6bb", type: "LOGIN" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            user.usersReducers(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
