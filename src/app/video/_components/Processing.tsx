import getInitialDetails from "../_actions/getInitialDetails";
import ProcessingForm from "./ProcessingForm";

interface Props {
  id: string;
  title: string;
}

export default async function Processing({ id, title }: Props) {
  const details = await getInitialDetails();

  console.log(details);

  return <ProcessingForm id={id} title={title} />;
}
