import { generateHeavyData } from "./_lib/dataGenerator";
import ClientPage from "./ClientPage";

export default function Main() {
  // Generate data on the server. This ensures consistency between server render and client hydration
  // because the data is passed as props (embedded in the HTML payload).
  const data = generateHeavyData();

  return <ClientPage initialData={data} />;
}
