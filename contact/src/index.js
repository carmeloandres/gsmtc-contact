import{registerBlockType} from "@wordpress/blocks"

registerBlockType("gsmtc/contact",{
    title: "Contact",
    category: "widgets",
    icon: "admin-users",
    edit: () => <h2>Contact</h2>,
    save: () => <h2>Contact</h2>
});
