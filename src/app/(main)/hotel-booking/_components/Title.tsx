import Link from "next/link";

const Title = ({
  title,
  linkLabel,
  linkPath,
}: {
  title: string;
  linkLabel?: string;
  linkPath?: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-gray-900 font-medium text-xl">{title}</h4>

      {linkLabel && linkPath && (
        <Link href={linkPath} className="text-app-primary hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
};

export default Title;
