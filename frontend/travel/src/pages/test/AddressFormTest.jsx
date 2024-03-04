import FormInput from "../../components/FormInput";

const AddressFormTest = ({data, dataCallback, user}) => {
    const onChange = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.form);
        const userData = {
            name: formData.get("firstname") + " " + formData.get("lastname"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            country: formData.get("country"),
            county: formData.get("county"),
            city: formData.get("city"),
            amount: 1000 * 100,
            user: user
        }
        dataCallback(userData);
    }

    return (
        <form className="card-body p-lg-3 p-xl-3 p-md-3 text-center" onChange={onChange}>
            <h3 className="mb-4">Billing Data</h3>
            <div className="row">
                <div className="col-md-6">
                    <FormInput content="First name" type="text" name="firstname" defaultValue={data.firstname}/>
                </div>
                <div className="col-md-6">
                    <FormInput content="Last name" type="text" name="lastname" defaultValue={data.lastname}/>
                </div>
            </div>

            <FormInput content="Email" type="email" name="email" defaultValue={data.email}/>
            <FormInput content="Phone Number" type="number" name="phoneNumber" defaultValue={data.phoneNumber}/>
            <FormInput content="Country" type="text" name="country" defaultValue={data.country}/>
            <div className="row">
                <div className="col-md-6">
                    <FormInput content="City" type="text" name="city" defaultValue={data.city}/>
                </div>
                <div className="col-md-6">
                    <FormInput content="County" type="text" name="county" defaultValue={data.county}/>
                </div>
            </div>
        </form>
    );
}
export default AddressFormTest