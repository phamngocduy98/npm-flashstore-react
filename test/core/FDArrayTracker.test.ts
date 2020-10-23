import {expect} from "chai";
import {OnArrayChangedListener} from "../../src/core/internal";
import {db} from "../index";

describe("FDArrayTracker tests", function () {
    this.timeout(10000);
    it("Linked Document Array: onUserArrayChangedListener.onItemInserted", (done) => {
        let newlyAddedUserId = "newlyAdded";
        let testVillage = db.villages.document("test_village");
        let onUserArrayChangedListener = new OnArrayChangedListener();
        onUserArrayChangedListener.onItemsInserted = (inserted) => {
            expect(inserted, "inserted length").have.lengthOf(1);
            expect(inserted[0].ref.id, "inserted[0]").equal(newlyAddedUserId);
            done();
        };
        testVillage
            .linkedArray("members")
            .delete(db.users.document(newlyAddedUserId))
            .then(() => {
                return testVillage.get();
            })
            .then(() => {
                testVillage.linkedArray("members").addOnArrayChangedListener(onUserArrayChangedListener);
            })
            .then(() => {
                return testVillage.linkedArray("members").add(db.users.document(newlyAddedUserId));
            })
            .then(() => {
                return testVillage.get();
            })
            .catch((e) => {
                console.error(e);
                throw e;
            });
    });

    it("Linked Document Array: onUserArrayChangedListener.onItemRemoved", (done) => {
        let newlyAddedUserId = "newlyAdded";
        let testVillage = db.villages.document("test_village");
        let onUserArrayChangedListener = new OnArrayChangedListener();
        onUserArrayChangedListener.onItemsRemoved = (removed) => {
            expect(removed, "removed length").have.lengthOf(1);
            expect(removed[0].ref.id, "removed[0]").equal(newlyAddedUserId);
            done();
        };
        testVillage
            .linkedArray("members")
            .add(db.users.document(newlyAddedUserId))
            .then(() => {
                return testVillage.get();
            })
            .then(() => {
                testVillage.linkedArray("members").addOnArrayChangedListener(onUserArrayChangedListener);
            })
            .then(() => {
                return testVillage.linkedArray("members").delete(db.users.document(newlyAddedUserId));
            })
            .then(() => {
                return testVillage.get();
            })
            .catch((e) => {
                console.error(e);
                throw e;
            });
    });
});
