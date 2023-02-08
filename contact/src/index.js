import { registerBlockType} from "@wordpress/blocks";
import { Edit } from "./edit";
import { Save } from "./save";

import './style.scss';

registerBlockType("gsmtc/contact",{
    title: "Contact",
    category: "widgets",
    icon: "admin-users",
    attributes:{
		urlPoliticaPrivacidad:{
            type: 'string',
		},
		urlAvisoLegal:{
            type: 'string',
		},
        urlPoliticaCookies:{
            type: 'string',
		}           
    },
    edit: Edit,
    save: Save
});
