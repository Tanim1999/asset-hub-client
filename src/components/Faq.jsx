/* eslint-disable react/no-unescaped-entities */


const Faq = () => {
    return (
        <div className="my-10">
            <h2 className="text-3xl text-center font-bold my-5">
                Frequently Asked Questions
            </h2>
            <div className="join bg-[#175f82] text-white join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                        Should i join as an employee or admin?
                    </div>
                    <div className="collapse-content">
                        <p>If you have a company and you want to manage your employees and assets then join as an admin, if you are the employee of a company join as an employee and ask your boss to add you in the team </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        Why I can't add team mates after joining as an admin?
                    </div>
                    <div className="collapse-content">
                        <p>We have 3 packages to increase member limit, You have to buy packages to increase the member limit to add your employee to the team.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How this will help us to manage our assets?
                    </div>
                    <div className="collapse-content">
                        <p>Our website is built to make it easy for users to manage their company assets. You can keep track of all the assets and requests incuding approval and rejection status. You can also request for custom assets as an employee. So believe us we won't disappoint you. You will feel like managing assets never been so easy like now.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Faq;

