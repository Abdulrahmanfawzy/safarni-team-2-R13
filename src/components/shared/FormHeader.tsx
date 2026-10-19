const FormHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="text-3xl text-gray-900 font-medium">{title}</h1>
      <p className="text-lg font-normal text-gray-600">{description}</p>
    </>
  );
};

export default FormHeader;
