'use client'
import React, { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import InputField from './InputField'
import schema from '../../lib/validationSchema'
import { useUserContext } from '../../context/userContext';



const EditForm = ({
    isLoading,
    setIsLoading,
    resume,
    fetchResume,
}) => {
    const { userData, userDataLoading } = useUserContext();
    const [isPublic, setIsPublic] = useState(resume.isPublic);


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            title: resume.title,
            userId: resume.userId,
            fullName: resume.data.fullName,
            email: resume.data.email,
            linkedinURL: resume.data.linkedinURL,
            phone: resume.data.phone,
            summary: resume.data.summary,
            experiences: resume.data.experiences,
            skills: resume.data.skills,
            education: resume.data.education,
            projects: resume.data.projects,
            certifications: resume.data.certifications,
        },
    });

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: 'experiences',
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: 'skills',
    });

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: 'education',
    });

    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
        control,
        name: 'projects',
    });

    const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
        control,
        name: 'certifications',
    });




    const submitFnt = async (data) => {
        setIsLoading(true);
        const dataToSend = {
            _id: resume._id,
            title: data.title,
            userId: userData._id,
            isPublic: isPublic,
            data: {
                fullName: data.fullName,
                email: data.email,
                linkedinURL: data.linkedinURL,
                phone: data.phone,
                summary: data.summary,
                experiences: data.experiences,
                skills: data.skills,
                education: data.education,
                projects: data.projects,
                certifications: data.certifications,
            },
        };


        try {
            const res = await fetch('/api/resume', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const responseBody = await res.json();
            console.log("responseBody: ", responseBody);
            const { resumeId } = responseBody;
            console.log('resume id :', resumeId);
            // Push in new tab with resume data
            await fetchResume();
            window.open(`/resume-preview/${resumeId}`, '_blank');
        } catch (error) {
            console.error(error);
            toast.error("Error generating resume");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            {
                userDataLoading ? (
                    <div className="flex justify-center items-center h-screen" >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
                    </div >
                ) : (
                    <>
                        <div className="">
                            {/* implement public/private logic here  */}
                        </div>
                        <form onSubmit={handleSubmit(submitFnt)} noValidate style={formStyles}>
                            <InputField
                                label="Resume Title"
                                name="title"
                                register={register}
                                required={true}
                                errors={errors.fullName?.message}
                            />
                            <div className="flex items-center">
                                <label htmlFor="isPublic" className="mr-2">Public:</label>
                                <input
                                    type="checkbox"
                                    id="isPublic"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                   className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                            </div>
                            <hr />
                            <InputField
                                label="Full Name"
                                name="fullName"
                                register={register}
                                required={true}
                                errors={errors.fullName?.message}
                            />

                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                register={register}
                                required={true}
                                errors={errors.email?.message}
                            />

                            <InputField
                                label="Linkedin Url"
                                name="linkedinURL"
                                register={register}
                                required={true}
                                errors={errors.linkedinURL?.message}
                            />

                            <InputField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                register={register}
                                required={true}
                                errors={errors.phone?.message}
                            />

                            <InputField
                                label="Professional Summary"
                                name="summary"
                                register={register}
                                isTextArea={true}
                                errors={errors.summary?.message}
                            />

                            {/* Experiences */}
                            <h3 style={sectionHeadingStyles}>Professional Experiences</h3>
                            {experienceFields.map((field, index) => (
                                <div key={field.id} style={fieldContainerStyles}>
                                    <InputField
                                        label={`Job Title ${index + 1}`}
                                        name={`experiences[${index}].jobTitle`}
                                        register={register}
                                        required={true}
                                        errors={errors.experiences?.[index]?.jobTitle?.message}
                                    />
                                    <InputField
                                        label={`Company ${index + 1}`}
                                        name={`experiences[${index}].company`}
                                        register={register}
                                        required={true}
                                        errors={errors.experiences?.[index]?.company?.message}
                                    />
                                    <InputField
                                        label={`Description ${index + 1}`}
                                        name={`experiences[${index}].description`}
                                        register={register}
                                        isTextArea={true}
                                        errors={errors.experiences?.[index]?.description?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(index)}
                                        style={removeButtonStyles}
                                    >
                                        Remove Experience
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendExperience({})} style={addButtonStyles}>
                                Add Experience
                            </button>

                            {/* Education */}
                            <h3 style={sectionHeadingStyles}>Education</h3>
                            {educationFields.map((field, index) => (
                                <div key={field.id} style={fieldContainerStyles}>
                                    <InputField
                                        label={`Degree ${index + 1}`}
                                        name={`education[${index}].degree`}
                                        register={register}
                                        required={true}
                                        errors={errors.education?.[index]?.degree?.message}
                                    />
                                    <InputField
                                        label={`Institution ${index + 1}`}
                                        name={`education[${index}].institution`}
                                        register={register}
                                        required={true}
                                        errors={errors.education?.[index]?.institution?.message}
                                    />
                                    <InputField
                                        label={`Description ${index + 1}`}
                                        name={`education[${index}].description`}
                                        register={register}
                                        isTextArea={true}
                                        errors={errors.education?.[index]?.description?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        style={removeButtonStyles}
                                    >
                                        Remove Education
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendEducation({})} style={addButtonStyles}>
                                Add Education
                            </button>

                            {/* Projects */}
                            <h3 style={sectionHeadingStyles}>Projects</h3>
                            {projectFields.map((field, index) => (
                                <div key={field.id} style={fieldContainerStyles}>
                                    <InputField
                                        label={`Title ${index + 1}`}
                                        name={`projects[${index}].title`}
                                        register={register}
                                        required={true}
                                        errors={errors.projects?.[index]?.title?.message}
                                    />
                                    <InputField
                                        label={`Description ${index + 1}`}
                                        name={`projects[${index}].description`}
                                        register={register}
                                        required={true}
                                        isTextArea={true}
                                        errors={errors.projects?.[index]?.description?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        style={removeButtonStyles}
                                    >
                                        Remove Project
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendProject({})} style={addButtonStyles}>
                                Add Project
                            </button>

                            {/* Certifications */}
                            <h3 style={sectionHeadingStyles}>Certifications</h3>
                            {certificationFields.map((field, index) => (
                                <div key={field.id} style={fieldContainerStyles}>
                                    <InputField
                                        label={`Title ${index + 1}`}
                                        name={`certifications[${index}].name`}
                                        register={register}
                                        required={true}
                                        errors={errors.certifications?.[index]?.name?.message}
                                    />
                                    <InputField
                                        label={`Authority ${index + 1}`}
                                        name={`certifications[${index}].authority`}
                                        register={register}
                                        required={true}
                                        errors={errors.certifications?.[index]?.authority?.message}
                                    />
                                    <InputField
                                        label={`Description ${index + 1}`}
                                        name={`certifications[${index}].description`}
                                        register={register}
                                        required={true}
                                        isTextArea={true}
                                        errors={errors.certifications?.[index]?.description?.message}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCertification(index)}
                                        style={removeButtonStyles}
                                    >
                                        Remove Certification
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendCertification({})} style={addButtonStyles}>
                                Add Certification
                            </button>

                            {/* Skills  */}
                            <h3 style={sectionHeadingStyles}>Skills</h3>
                            <div className="grid grid-cols-2">
                                {skillFields.map((field, index) => (
                                    <div key={field.id} style={fieldContainerStyles}>
                                        <InputField
                                            label={`Skill ${index + 1}`}
                                            name={`skills[${index}].name`}
                                            register={register}
                                            required={true}
                                            errors={errors.skills?.[index]?.name?.message}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            style={removeButtonStyles}
                                        >
                                            Remove Skill
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => appendSkill({})} style={addButtonStyles}>
                                Add Skill
                            </button>




                            <button disabled={isLoading} type="submit" style={submitButtonStyles}>
                                {isLoading ? "Loading..." : "Update Resume"}
                            </button>
                        </form>
                    </>
                )}
        </>
    )
}

export default EditForm;




// Styling for components

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const sectionHeadingStyles = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
};

const fieldContainerStyles = {
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#fff',
};

const removeButtonStyles = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
};

const addButtonStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 0',
};

const submitButtonStyles = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
};


