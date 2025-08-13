import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Contact from "../routes/Contact.jsx";
import AddContact from "../routes/AddContact.jsx";
import EditContact from "../routes/EditContact.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: 'contact/:id',
        element: <Contact />,
    },
    {
        path: 'add',
        element: <AddContact />,
    },
    {
        path: 'edit/:id',
        element: <EditContact />,
    }
]);

export default router;