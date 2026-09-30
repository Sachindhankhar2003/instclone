// JavaScript for Instagram Clone Interactivity

document.addEventListener('DOMContentLoaded', () => {

    // 1. Like Functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle classes between regular heart (empty) and solid heart (filled)
            if (this.classList.contains('fa-regular')) {
                // Like action
                this.classList.remove('fa-regular');
                this.classList.add('fa-solid');
                this.style.color = '#ff3040';
                
                // Add animation
                this.classList.add('like-animated');
                setTimeout(() => {
                    this.classList.remove('like-animated');
                }, 300);

                // Update like count (simulation)
                const likesElement = this.closest('.post').querySelector('.likes-count strong');
                if (likesElement) {
                    let currentLikesText = likesElement.innerText;
                    let currentLikes = parseInt(currentLikesText.replace(/,/g, '').replace(' likes', ''));
                    if (!isNaN(currentLikes)) {
                        likesElement.innerText = (currentLikes + 1).toLocaleString() + ' likes';
                    }
                }
            } else {
                // Unlike action
                this.classList.remove('fa-solid');
                this.classList.add('fa-regular');
                this.style.color = ''; // reset to default CSS color
                
                // Update like count (simulation)
                const likesElement = this.closest('.post').querySelector('.likes-count strong');
                if (likesElement) {
                    let currentLikesText = likesElement.innerText;
                    let currentLikes = parseInt(currentLikesText.replace(/,/g, '').replace(' likes', ''));
                    if (!isNaN(currentLikes) && currentLikes > 0) {
                        likesElement.innerText = (currentLikes - 1).toLocaleString() + ' likes';
                    }
                }
            }
        });
    });

    // 2. Save Functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('fa-regular')) {
                this.classList.remove('fa-regular');
                this.classList.add('fa-solid');
            } else {
                this.classList.remove('fa-solid');
                this.classList.add('fa-regular');
            }
        });
    });

    // 3. Double-Click Image to Like
    const postImages = document.querySelectorAll('.post-content img');
    
    postImages.forEach(img => {
        img.addEventListener('dblclick', function() {
            const post = this.closest('.post');
            const likeBtn = post.querySelector('.like-btn');
            
            // Only trigger if not already liked
            if (likeBtn && likeBtn.classList.contains('fa-regular')) {
                likeBtn.click(); // Trigger click event on the heart icon
                
                // Create floating heart effect over image
                const heart = document.createElement('i');
                heart.classList.add('fa-solid', 'fa-heart');
                heart.style.position = 'absolute';
                heart.style.top = '50%';
                heart.style.left = '50%';
                heart.style.transform = 'translate(-50%, -50%) scale(0)';
                heart.style.color = 'white';
                heart.style.fontSize = '80px';
                heart.style.opacity = '0.9';
                heart.style.textShadow = '0 0 10px rgba(0,0,0,0.3)';
                heart.style.transition = 'all 0.3s ease-in-out';
                heart.style.zIndex = '10';
                
                // Need to make parent relative
                const parent = this.parentElement;
                parent.style.position = 'relative';
                parent.appendChild(heart);
                
                // Animate
                setTimeout(() => {
                    heart.style.transform = 'translate(-50%, -50%) scale(1.2)';
                }, 10);
                
                setTimeout(() => {
                    heart.style.transform = 'translate(-50%, -50%) scale(0)';
                    heart.style.opacity = '0';
                    setTimeout(() => {
                        heart.remove();
                    }, 300);
                }, 1000);
            }
        });
    });

    // 4. Follow Button Toggle in Suggestions
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.innerText === 'Follow') {
                this.innerText = 'Following';
                this.style.color = 'var(--text-color)';
            } else {
                this.innerText = 'Follow';
                this.style.color = 'var(--blue-color)';
            }
        });
    });

    // 5. Active state for Sidebar Navigation
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('profile-link')) {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 6. Post Comment Implementation
    const commentInputs = document.querySelectorAll('.add-comment input');
    
    commentInputs.forEach(input => {
        const postBtn = input.nextElementSibling;
        
        postBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const commentText = input.value.trim();
            
            if (commentText) {
                // Create a basic visual confirmation of comment posted
                const inputParent = this.parentElement;
                const originalPlaceholder = input.placeholder;
                
                input.value = '';
                input.placeholder = 'Comment posted...';
                
                // Change back after a second
                setTimeout(() => {
                    input.placeholder = originalPlaceholder;
                }, 2000);
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                postBtn.click();
            }
        });
    });
});
