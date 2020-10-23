import {expect} from "chai";
import {db} from "../index";

describe("Firestore Collection tests", function () {
    this.timeout(10000);
    it("get collection documents", async () => {
        let usersData = await db.users.get();
        console.info(usersData);
        expect(usersData, "check result length").to.have.length.greaterThan(0);
        expect(usersData[0], "check result document data: check property name").to.have.haveOwnProperty("name");
    });
});
