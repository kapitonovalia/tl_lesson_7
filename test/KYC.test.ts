import {UserEstonia} from "../src/UserEstonia";
import {UserLatvia} from "../src/UserLatvia";
import {KYC} from "../src/KYC";
import {Contract} from "../src/Contract";


describe("KYC tests", () => {
    let oldEstonianUser: UserEstonia;
    let youngEstonianUser: UserEstonia;
    let oldLatvianUser: UserLatvia;
    let youngLatvianUser: UserLatvia;
    let contract: Contract;

    beforeEach(() => {
        oldEstonianUser = new UserEstonia("Yakob", "Lvovich", 24);
        youngEstonianUser = new UserEstonia("Yakob", "Lvovich", 15);
        oldLatvianUser = new UserLatvia("Yakob", "Lvovoch", 24);
        youngLatvianUser = new UserLatvia("Yakob", "Lvovoch", 17);
        contract = new Contract("Agreement");
    });

    test("ESTONIA: mobileIDAuthorization default value is undefined", () => {
        expect(oldEstonianUser.mobileIDAuthorization).toBeUndefined();

    });
    test("LATVIA: activateEParakstsForLatvia default value is undefined", () => {
        expect(oldLatvianUser.activateEParakstsForLatvia).toBeUndefined();

    });
    test("ESTONIA: activateMobileIDForEstonia works", () => {
        KYC.activateMobileIDForEstonia(oldEstonianUser);
        expect(oldEstonianUser.mobileIDAuthorization).not.toBeUndefined();
        expect(oldEstonianUser.mobileIDAuthorization).toBeTruthy();
    });
    test("LATVIA: activateMobileIDForEstonia works", () => {
        KYC.activateEParakstsForLatvia(oldLatvianUser);
        expect(oldLatvianUser.activateEParakstsForLatvia).not.toBeUndefined();
        expect(oldLatvianUser.activateEParakstsForLatvia).toBeTruthy();
    });
    test("ESTONIA: activateMobileIDForEstonia throw error", () => {
        expect(() => {
            KYC.activateMobileIDForEstonia(youngEstonianUser);
        }).toThrow("User is too young")
    });
    test("LATVIA: activateMobileIDForEstonia works", () => {

        expect(() => {
            KYC.activateEParakstsForLatvia(youngLatvianUser);
        }).toThrow("User is too young");
    });

    test("EST: contract can be signed when mobileID is active", () => {
        KYC.activateMobileIDForEstonia(oldEstonianUser);
        expect(oldEstonianUser.mobileIDAuthorization).toBeTruthy();
        expect(KYC.signForEstonia).toBeTruthy();
    });
    test("EST: contract can not be signed when mobileID is inactive", () =>{
        KYC.activateMobileIDForEstonia(youngEstonianUser);
        expect(youngEstonianUser.mobileIDAuthorization).toBeFalsy();
        expect(KYC.signForEstonia).toBeFalsy();
    });
    test("LAT: contract can be signed when EParaksts is active", () => {
        KYC.activateEParakstsForLatvia(oldLatvianUser);
        expect(oldLatvianUser.activateEParakstsForLatvia).toBeTruthy();
        expect(KYC.signForLatvia).toBeTruthy();
    });
    test("LAT: contract can not be signed when EParaksts is inactive", () => {
        KYC.activateEParakstsForLatvia(youngLatvianUser);
        expect(youngLatvianUser.activateEParakstsForLatvia).toBeTruthy();
        expect(KYC.signForLatvia).toBeTruthy();
    });
})
