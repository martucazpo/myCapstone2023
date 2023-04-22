const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../../index")
const agent = chai.request.agent(server)
const assert = chai.assert

chai.use(chaiHttp)

suite("I can update my Test User and change them back", () => {
    test1 = {
        irstName: "Lettuce",
        lastName: "B",
        email: "lettuceb@mail.com",
        password: "password",
        role: "Admin"
    }
    test2 = {
        irstName: "Lettuce",
        lastName: "B",
        email: "lettuceb@mail.com",
        password: "chicken",
        role: "Admin"
    }
    test3 = {
        firstName: "Lettuce",
        lastName: "C",
        email: "lettucec@mail.com",
        password: "password",
        role: "Admin"
    }
    test("If I try and make a change without logging in, I will get an error", (done) => {
        chai
            .request(server)
            .post("/profile/update")
            .send(test1)
            .end((err, res) => {
                assert.equal(res.status, 202)
                assert.equal(res.body.message, "Please log in.")
                done()
            })
    })
    test("I can change the email", (done) => {
        agent
            .post("/auth/login")
            .send({ email: "lettucec@mail.com", password: "password" })
            .then(async () => {
                await agent
                    .post("/profile/update")
                    .send(test1)
                    .then(async () => {
                        await agent
                            .post("/auth/logout")
                            .send({})
                            .then(async () => {
                                await agent
                                    .post("/auth/login")
                                    .send({ email: "lettuceb@mail.com", password: "password" })
                                    .then((res) => {
                                        assert.equal(res.status, 200)
                                        assert.exists(res.body._id)
                                        done()
                                    })
                            })
                    })
            })
    })
    test("I can change the password", (done) => {
        agent
            .post("/auth/login")
            .send({ email: "lettuceb@mail.com", password: "password" })
            .then(async () => {
                await agent
                    .post("/profile/update")
                    .send(test2)
                    .then(async () => {
                        await agent
                            .post("/auth/logout")
                            .send({})
                            .then(async () => {
                                await agent
                                    .post("/auth/login")
                                    .send({ email: "lettuceb@mail.com", password: "chicken" })
                                    .then((res => {
                                        assert.equal(res.status, 200)
                                        assert.exists(res.body._id)
                                        done()
                                    })).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    })
    test("I can change everything back", (done) => {
        agent
            .post("/auth/login")
            .send({ email: "lettuceb@mail.com", password: "chicken" })
            .then(async () => {
                await agent
                    .post("/profile/update")
                    .send(test3)
                    .then(async () => {
                        await agent
                            .post("/auth/logout")
                            .send({})
                            .then(async () => {
                                await agent
                                    .post("/auth/login")
                                    .send({ email: "lettucec@mail.com", password: "password" })
                                    .then((res => {
                                        assert.equal(res.status, 200)
                                        assert.exists(res.body._id)
                                        done()
                                    })).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    })
})