import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react"

const Documentation = () => {
    const [expanded, setExpanded] = useState("")

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const sections = [
        {
            id: 0,
            title: "Sección 0 - Fundamentos de la Declaración legal",
            html: `Art 0.1.- La declaración legal presente en dicha página: /legal, es un documento visible desde la web que compone los términos que se deben cumplir en la web, así como las políticas de privacidad (como cookies o gestión de datos).<br/>Art 0.2.- En la página web existe una jerarquía administrativa, esta jerarquía queda compuesta por usuarios bloqueados, usuarios activos, administradores, administradores globales y owner.<br/>Art 0.3.- Los usuarios bloqueados se definen como cuentas que no podrán hacer uso de la página web.<br/>Art 0.4.-Los usuarios activos se definen como cuentas de usuarios que pueden hacer uso del servicio web.<br/>Art 0.5.- Los administradores se define como una cuenta de usuario que tiene derechos de administración, tales como degradar a un usuario de ser usuario activo a ser usuario bloqueado. Los administradores también pueden gestionar mensajes de contacto.`
        },
        {
            id: 1,
            title: "Sección 1 - Datos que recopilamos",
            html: `Eu ea et <a href="https://google.es" target="_blank">eu</a> elit aute incididunt consectetur mollit esse ex Lorem proident. Ipsum ex exercitation deserunt ut voluptate laborum. Ullamco eu proident esse in aliqua consequat. Nostrud eiusmod aliqua aute culpa dolore aliqua enim qui est excepteur fugiat occaecat eiusmod. Quis sunt eiusmod qui est quis duis voluptate mollit irure.Incididunt est do et anim irure. Non ea id ex labore nostrud occaecat nostrud velit nostrud qui. Quis amet commodo occaecat nostrud consequat occaecat quis qui ex nostrud laboris in ipsum. Aliquip irure amet deserunt laborum sunt mollit sint duis. Est fugiat duis dolore nulla sit ut aliquip culpa in.Consectetur in ex Lorem in exercitation officia consectetur pariatur quis magna consectetur ad. Ullamco nisi esse incididunt cupidatat ex. Incididunt dolore adipisicing id sunt amet aliqua magna duis. Consequat eu officia sit culpa esse. Elit dolor quis eu dolor eu do ex adipisicing consequat. Aliqua reprehenderit elit et esse exercitation consectetur cupidatat. Dolor eiusmod enim reprehenderit mollit fugiat excepteur esse excepteur id.Sint Lorem culpa occaecat mollit eiusmod Lorem. Minim ipsum adipisicing amet officia qui esse duis enim voluptate nostrud. Incididunt adipisicing et sint Lorem pariatur cupidatat laboris reprehenderit fugiat. Consequat consectetur dolor nostrud labore dolor minim irure Lorem aliquip minim consectetur eu. Ut anim non cillum voluptate officia amet cupidatat laboris.Proident laborum do velit esse quis voluptate non ea adipisicing irure voluptate voluptate in. Reprehenderit quis consectetur ad aute ex aliqua pariatur. Culpa mollit sunt consectetur ea.`
        },
        {
            id: 2,
            title: "Sección 2 - Política de Cookies",
            html: `Eu ea et eu elit aute incididunt consectetur mollit esse ex Lorem proident. Ipsum ex exercitation deserunt ut voluptate laborum. Ullamco eu proident esse in aliqua consequat. Nostrud eiusmod aliqua aute culpa dolore aliqua enim qui est excepteur fugiat occaecat eiusmod. Quis sunt eiusmod qui est quis duis voluptate mollit irure.Incididunt est do et anim irure. Non ea id ex labore nostrud occaecat nostrud velit nostrud qui. Quis amet commodo occaecat nostrud consequat occaecat quis qui ex nostrud laboris in ipsum. Aliquip irure amet deserunt laborum sunt mollit sint duis. Est fugiat duis dolore nulla sit ut aliquip culpa in.Consectetur in ex Lorem in exercitation officia consectetur pariatur quis magna consectetur ad. Ullamco nisi esse incididunt cupidatat ex. Incididunt dolore adipisicing id sunt amet aliqua magna duis. Consequat eu officia sit culpa esse. Elit dolor quis eu dolor eu do ex adipisicing consequat. Aliqua reprehenderit elit et esse exercitation consectetur cupidatat. Dolor eiusmod enim reprehenderit mollit fugiat excepteur esse excepteur id.Sint Lorem culpa occaecat mollit eiusmod Lorem. Minim ipsum adipisicing amet officia qui esse duis enim voluptate nostrud. Incididunt adipisicing et sint Lorem pariatur cupidatat laboris reprehenderit fugiat. Consequat consectetur dolor nostrud labore dolor minim irure Lorem aliquip minim consectetur eu. Ut anim non cillum voluptate officia amet cupidatat laboris.Proident laborum do velit esse quis voluptate non ea adipisicing irure voluptate voluptate in. Reprehenderit quis consectetur ad aute ex aliqua pariatur. Culpa mollit sunt consectetur ea.`
        },
        {
            id: 3,
            title: "Sección 3 - Declaración de términos",
            html: `Eu ea et eu elit aute incididunt consectetur mollit esse ex Lorem proident. Ipsum ex exercitation deserunt ut voluptate laborum. Ullamco eu proident esse in aliqua consequat. Nostrud eiusmod aliqua aute culpa dolore aliqua enim qui est excepteur fugiat occaecat eiusmod. Quis sunt eiusmod qui est quis duis voluptate mollit irure.Incididunt est do et anim irure. Non ea id ex labore nostrud occaecat nostrud velit nostrud qui. Quis amet commodo occaecat nostrud consequat occaecat quis qui ex nostrud laboris in ipsum. Aliquip irure amet deserunt laborum sunt mollit sint duis. Est fugiat duis dolore nulla sit ut aliquip culpa in.Consectetur in ex Lorem in exercitation officia consectetur pariatur quis magna consectetur ad. Ullamco nisi esse incididunt cupidatat ex. Incididunt dolore adipisicing id sunt amet aliqua magna duis. Consequat eu officia sit culpa esse. Elit dolor quis eu dolor eu do ex adipisicing consequat. Aliqua reprehenderit elit et esse exercitation consectetur cupidatat. Dolor eiusmod enim reprehenderit mollit fugiat excepteur esse excepteur id.Sint Lorem culpa occaecat mollit eiusmod Lorem. Minim ipsum adipisicing amet officia qui esse duis enim voluptate nostrud. Incididunt adipisicing et sint Lorem pariatur cupidatat laboris reprehenderit fugiat. Consequat consectetur dolor nostrud labore dolor minim irure Lorem aliquip minim consectetur eu. Ut anim non cillum voluptate officia amet cupidatat laboris.Proident laborum do velit esse quis voluptate non ea adipisicing irure voluptate voluptate in. Reprehenderit quis consectetur ad aute ex aliqua pariatur. Culpa mollit sunt consectetur ea.`
        },
        {
            id: 4,
            title: "Sección 4 - Actualización de la documentación legal",
            html: `Art 4.1.- Con el fin de proveer un servicio lo más actualizado posible bajo la mayor brevedad posible, nuestro servicio web se reserva el derecho de escalar la documentación.<br/>Art 4.2.- Se define escalar la documentación legal como el conjunto de hechos entre los que se encuentran añadir información adicional a secciones y/o artículos, eliminar información de artículos y/o secciones, eliminar secciones, añadir secciones, añadir artículos`
        },
    ]

    const footer = "Esta página del sitio web se corresponde con la documentación legal del mismo. Los administradores del sitio web se reservan el derecho de actualizar en un futuro dicha documentación bajo libre conducta. Para más información consulte la sección Actualización de la documentación."

    return (
        <div className="animate__animated animate__fadeIn">
            <Typography variant="h4" component="h1" sx={{textAlign: 'center'}}>Documentación legal</Typography>
            <Divider/><br/>
                {sections.map(section => (
                    <Accordion key={section.id} expanded={expanded === `panel${section.id-1}`} onChange={handleChange(`panel${section.id-1}`)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component="p" dangerouslySetInnerHTML={{__html: section.html}}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <br/>
                <Typography variant="body1" sx={{textAlign: 'center'}} component="p" dangerouslySetInnerHTML={{__html: footer}} />
                <br/>
        </div>
    )

}

export default Documentation