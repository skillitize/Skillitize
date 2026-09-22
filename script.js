
document.addEventListener("DOMContentLoaded", () => {

    console.log("Script Loaded");


    /* ==========================
       LEAD POPUP
    ========================== */

    const popup = document.getElementById("leadPopup");

    if (popup) {

        // Show popup only once
        if (!localStorage.getItem("popupShown")) {

            setTimeout(() => {

                popup.style.display = "flex";

                localStorage.setItem("popupShown", "true");

            }, 1000);
        }

        const closeBtn =
            document.querySelector(".close-popup");

        if (closeBtn) {

            closeBtn.addEventListener("click", () => {

                popup.style.display = "none";

            });

        }

    }


    /* ==========================
       CAREER SUPPORT WIDGET
    ========================== */

    const careerBtn =
        document.getElementById("careerBtn");

    const careerBox =
        document.getElementById("careerBox");

    const closeCareer =
        document.getElementById("closeCareer");

    if (careerBtn && careerBox) {

        careerBtn.addEventListener("click", () => {

            careerBox.classList.toggle("show");

        });


        if (closeCareer) {

            closeCareer.addEventListener("click", () => {

                careerBox.classList.remove("show");

            });

        }


        document.addEventListener("click", (e) => {

            if (
                !careerBox.contains(e.target) &&
                !careerBtn.contains(e.target)
            ) {

                careerBox.classList.remove("show");

            }

        });

    }


    /* ==========================
       FREE CAREER GUIDANCE
    ========================== */

    const guidanceBtn =
        document.getElementById("freeGuidance");

    if (guidanceBtn && popup) {

        guidanceBtn.addEventListener("click", (e) => {

            e.preventDefault();

            popup.style.display = "flex";

            if (careerBox) {

                careerBox.classList.remove("show");

            }

        });

    }


    /* ==========================
       LEAD FORM SUBMIT
    ========================== */

    const leadForm =
        document.getElementById("leadForm");

    if (leadForm) {

        leadForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const data = {

                name:
                    document.getElementById("name").value,

                email:
                    document.getElementById("email").value,

                phone:
                    document.getElementById("phone").value,

                college:
                    document.getElementById("college").value,

                collegeCourse:
                    document.getElementById("collegeCourse").value,

                course:
                    document.getElementById("course").value,

                message:
                    document.getElementById("message").value

            };


            try {

                const response = await fetch(
                    "https://api.skillitize.com/submit.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );


                const result =
                    await response.json();


                if (result.success) {

                    alert(
                        "Thank you! Our team will contact you shortly."
                    );

                    leadForm.reset();


                    if (popup) {

                        popup.style.display = "none";

                    }

                } else {

                    alert("Submission failed.");

                }


            } catch (error) {

                console.error(
                    "Lead Form Error:",
                    error
                );

                alert(
                    "Server error. Please try again."
                );

            }

        });

    }


    /* ==========================
       CONTACT FORM
    ========================== */

    const contactForm =
        document.getElementById("contactForm");

    console.log(
        "Contact Form:",
        contactForm
    );


    if (contactForm) {

        contactForm.addEventListener("submit", async (e) => {

            console.log("Contact form submitted");

            e.preventDefault();


            const data = {

                name:
                    document.getElementById("contactName").value,

                email:
                    document.getElementById("contactEmail").value,

                phone:
                    document.getElementById("contactPhone").value,

                message:
                    document.getElementById("contactMessage").value

            };


            console.log(
                "Sending Data:",
                data
            );


            try {

                const response = await fetch(
                    "https://api.skillitize.com/contact_submit.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );


                console.log(
                    "Response:",
                    response
                );


                const result =
                    await response.json();


                console.log(
                    "Result:",
                    result
                );


                if (result.success) {

                    alert(
                        "Message sent successfully!"
                    );

                    contactForm.reset();

                } else {

                    alert(
                        "Submission failed."
                    );

                }


            } catch (error) {

                console.error(
                    "Fetch Error:",
                    error
                );

                alert(
                    "Server error. Please try again."
                );

            }

        });


    } else {

        console.error(
            "contactForm element not found in the DOM. " +
            "Check that the form's id is exactly 'contactForm' " +
            "and that this script runs after the form exists."
        );

    }


    /* ==========================
       DYNAMIC BLOGS
    ========================== */

    const blogsContainer =
        document.getElementById("blogsContainer");


    if (blogsContainer) {

        loadBlogs();

    }


    async function loadBlogs() {

        try {

            console.log("Loading blogs...");


            /*
             * CORRECT BLOG API
             */

            const response = await fetch(
                "https://api.skillitize.com/blog/get_posts.php"
            );


            console.log(
                "Blog API Response:",
                response
            );


            if (!response.ok) {

                throw new Error(
                    "Blog API returned HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            console.log(
                "Blog API Data:",
                data
            );


            /*
             * API FORMAT:
             *
             * {
             *   success: true,
             *   posts: [...]
             * }
             */


            if (
                !data ||
                data.success !== true ||
                !Array.isArray(data.posts)
            ) {

                throw new Error(
                    "Invalid blog API response"
                );

            }


            const blogs = data.posts;


            /*
             * Clear existing content
             */

            blogsContainer.innerHTML = "";


            /*
             * No blogs
             */

            if (blogs.length === 0) {

                blogsContainer.innerHTML = `
                    <div class="no-blogs">
                        <p>No blogs available at the moment.</p>
                    </div>
                `;

                return;

            }


            /*
             * Create blog cards
             */

            blogs.forEach((blog) => {

                const blogCard =
                    document.createElement("div");

                blogCard.className =
                    "blog-card";


                /* ==========================
                   IMAGE
                ========================== */

                const image =
                    document.createElement("img");


                if (blog.image_url) {

                    image.src =
                        blog.image_url;

                } else {

                    /*
                     * No image was provided,
                     * so use a simple placeholder.
                     */

                    image.src =
                        "https://via.placeholder.com/600x400?text=Skillitize+Blog";

                }


                image.alt =
                    blog.title ||
                    "Skillitize Blog";


                image.loading = "lazy";


                /* ==========================
                   CONTENT
                ========================== */

                const content =
                    document.createElement("div");

                content.className =
                    "blog-content";


                /* ==========================
                   TITLE
                ========================== */

                const title =
                    document.createElement("h3");

                title.textContent =
                    blog.title ||
                    "Untitled Blog";


                /* ==========================
                   SUMMARY
                ========================== */

                const description =
                    document.createElement("p");

                description.textContent =
                    blog.summary ||
                    "Read our latest career and technology insights.";


                /* ==========================
                   READ MORE
                ========================== */

                const readMore =
                    document.createElement("a");

                readMore.className =
                    "course-btn";

                readMore.textContent =
                    "Read More";


                /*
                 * Open blog using slug
                 */

                if (blog.slug) {

                    readMore.href =
                        "blog.html?slug=" +
                        encodeURIComponent(blog.slug);

                } else {

                    readMore.href =
                        "blog.html?id=" +
                        encodeURIComponent(blog.id);

                }


                /* ==========================
                   BUILD CARD
                ========================== */

                content.appendChild(title);

                content.appendChild(description);

                content.appendChild(readMore);


                blogCard.appendChild(image);

                blogCard.appendChild(content);


                blogsContainer.appendChild(blogCard);

            });


            console.log(
                blogs.length +
                " blog(s) displayed successfully."
            );


        } catch (error) {

            console.error(
                "Blog Loading Error:",
                error
            );


            blogsContainer.innerHTML = `
                <div class="blog-error">
                    <p>
                        Unable to load blogs right now.
                    </p>
                </div>
            `;

        }

    }

});

