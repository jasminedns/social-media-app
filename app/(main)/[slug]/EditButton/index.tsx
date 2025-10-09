import Link from "next/link";

const EditButton = async ({slug}:{slug:string}) => {
    return (
        <Link className="button-secondary" href={`/${slug}/edit`}>Edit</Link>
    )
}

export default EditButton;