import {Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, ToggleSwitch} from "flowbite-react";

const getCategories = async locale => {

  const response = await fetch(`http://localhost:3000/api/content/categories?locale=${locale}`)
  return await response.json();

}

const AdminCategoryIndex = async (props)=>{

  const params = await props.params;

  const {
    locale
  } = params;

  const {categories} = await getCategories(locale)



  return <>
    <Table>
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>In Menu</TableHeadCell>
      </TableHead>
      <TableBody>
        {categories.map((category) => (<TableRow key={category.id}>
          <TableCell>{category.name}</TableCell>
          <TableCell>
            <Checkbox id="accept" defaultChecked={category.in_menu} />
          </TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
  </>
}
export default AdminCategoryIndex