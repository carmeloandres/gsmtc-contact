import { registerBlockType} from "@wordpress/blocks";
import { Edit } from "./edit";

registerBlockType("gsmtc/contact",{
    title: "Contact",
    category: "widgets",
    icon: "admin-users",
    edit: Edit,
    save: () => <h2>Contact</h2>
});
