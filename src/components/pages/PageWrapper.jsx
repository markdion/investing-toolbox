import RootProvider from "../../providers/RootProvider";

export default function PageWrapper({ body }) {

  return (
    <RootProvider>
      {body}
    </RootProvider>
  );
}