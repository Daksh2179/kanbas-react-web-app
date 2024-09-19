import Modules from "../Modules";
import CoursesStatus from "./Status";
export default function Home() {
  return (
    <table id="wd-home">
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top">
          <CoursesStatus />
        </td>
      </tr>
    </table>
  );
}
