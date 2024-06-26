import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../src/App";
import { User } from "../src/models/user";
import EditProfileInfo from "../src/pages/EditProfileInfo";
import { LoadingProvider } from "../src/utils/loadingContext";

describe("Edit User Profile Test Case", () => {
    it("validate function should render all elements ", () => {
        const user: User = {
            firstName: "test",
            lastName: "testing",
            id: "204658362",
            email: "jest@gmail.com",
            issuedAtTimestamp: Date.now(),
            expiresAtTimestamp: 100000000000000,
            roles: ["Admin"],
            groups: [],
            masteredGroups: [],
            issuer: "admin",
            audience: "",
        };
        const component = render(
            <UserContext.Provider value={user}>
                <BrowserRouter>
                    <LoadingProvider>
                        <EditProfileInfo />
                    </LoadingProvider>
                </BrowserRouter>
            </UserContext.Provider>
        );

        const labelNode = component.getByText("Edit Account Info");
        expect(labelNode).toBeDefined;
    });
});
