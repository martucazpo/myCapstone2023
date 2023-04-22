const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../index")
const assert = chai.assert

chai.use(chaiHttp)

suite("Should be able to create a test user", () => {
    const testUser = {
        firstName: "Lettuce",
        lastName: "C",
        email: "lettucec@mail.com",
        password: "password",
        role: "Admin"
    }
    // test("should be able to make a test user", (done)=>{
    //     chai
    //     .request(server)
    //     .post("/auth/register")
    //     .send(testUser)
    //     .end((err, res)=>{
    //         console.log(res.body)
    //         assert.equal(res.status, 200)
    //         assert.exists(res.body._id)
    //         done()
    //     })
    // })
    test("If try to re save the same user, I should get an error", (done) => {
        chai
            .request(server)
            .post("/auth/register")
            .send(testUser)
            .end((err, res) => {
                assert.equal(res.status, 202)
                assert.equal(res.body.message, "lettucec@mail.com is already registered to the database")
                done()
            })
    })
    test("can login a user", (done) => {
        chai
            .request(server)
            .post("/auth/login")
            .send({ email: "lettucec@mail.com", password: "password" })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.exists(res.body._id)
                done()
            })
    }),
        test("can logout a user", (done) => {
            let agent = chai.request.agent(server)
            agent
                .post("/auth/login")
                .send({ email: "lettucec@mail.com", password: "password" })
                .then(async () => {
                    return await agent
                        .post("/auth/logout")
                        .send({})
                        .then((res) => {
                            assert.equal(res.status, 200)
                            assert.equal(res.body.message, "User is logged out.")
                            done()
                        }).catch(err => console.log(err))

                })
        })
})