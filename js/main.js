// Main JavaScript file for Personal Services Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Load services data
    loadServices();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Setup modal functionality
    setupModal();
    
    // Setup contact form
    setupContactForm();
    
    // Setup smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Setup active navigation on scroll
    setupActiveNavigation();
}

// Load services from JSON file
async function loadServices() {
    try {
        // THAY ĐỔI: Thực sự fetch từ file JSON
        const response = await fetch('data/services.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const services = await response.json();
        
        // Render services to the grid
        renderServices(services);
    } catch (error) {
        console.error('Error loading services:', error);
        
        // Fallback: dùng dữ liệu mặc định nếu file JSON không tồn tại
        console.log('Falling back to default data...');
        const services = getServicesData();
        renderServices(services);
        
        // Show warning message to user
        document.getElementById('servicesGrid').innerHTML += 
            '<p class="warning-message" style="text-align: center; margin-top: 20px; color: #ff9800;">⚠️ Đang sử dụng dữ liệu mặc định. Vui lòng kiểm tra file services.json</p>';
    }
}

// Get services data (in a real app, this would come from services.json)

// Render services to the grid
function renderServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (!servicesGrid) return;
    
    let servicesHTML = '';
    
    services.forEach(service => {
        servicesHTML += `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-content">
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-description">${service.shortDescription}</p>
                    <div class="service-meta">
                        <span class="service-price">${service.price}</span>
                        <button class="btn btn-primary view-detail-btn" data-service-id="${service.id}">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    servicesGrid.innerHTML = servicesHTML;
    
    // Add event listeners to view detail buttons
    document.querySelectorAll('.view-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            openServiceModal(serviceId, services);
        });
    });
}
// Open service modal with details
// Open service modal with details - VERSION AN TOÀN
function openServiceModal(serviceId, services) {
    try {
        const service = services.find(s => s.id === serviceId);
        
        if (!service) {
            console.error('Không tìm thấy service với ID:', serviceId);
            return;
        }
        
        console.log('Đang mở modal cho:', service.name);
        
        // 1. Set modal content
        const modalTitle = document.getElementById('modalServiceTitle');
        const modalDesc = document.getElementById('modalServiceDescription');
        const modalImage = document.getElementById('modalServiceImage');
        
        if (modalTitle) modalTitle.textContent = service.name;
        if (modalDesc) modalDesc.textContent = service.longDescription;
        
        // 2. Set features list - AN TOÀN
        const featuresContainer = document.getElementById('modalServiceFeatures');
        if (featuresContainer) {
            let featuresHTML = '<h3>Tính năng chính</h3><ul>';
            
            if (service.features && Array.isArray(service.features)) {
                service.features.forEach(feature => {
                    featuresHTML += `<li>${feature}</li>`;
                });
            } else {
                featuresHTML += '<li>Không có tính năng nào được liệt kê</li>';
            }
            
            featuresHTML += '</ul>';
            featuresContainer.innerHTML = featuresHTML;
        }
        
        // 3. Set preparations list - QUAN TRỌNG: PHẢI KIỂM TRA
        const preparationsContainer = document.getElementById('modalServicePreparations');
        
        // TH1: Nếu có container HTML nhưng dữ liệu không có preparations
        if (preparationsContainer) {
            if (service.preparations && Array.isArray(service.preparations) && service.preparations.length > 0) {
                let preparationsHTML = '<h3>Cần chuẩn bị</h3><ul>';
                
                service.preparations.forEach(item => {
                    preparationsHTML += `<li>${item}</li>`;
                });
                
                preparationsHTML += '</ul>';
                preparationsContainer.innerHTML = preparationsHTML;
                preparationsContainer.style.display = 'block'; // Hiển thị
            } else {
                // Ẩn container nếu không có dữ liệu
                preparationsContainer.style.display = 'none';
                console.log('Không có dữ liệu preparations, đang ẩn container');
            }
        } else {
            console.warn('Không tìm thấy phần tử modalServicePreparations trong HTML');
            // Nếu bạn chưa thêm phần tử này trong HTML, hãy bỏ qua
        }
        
        // 4. Open modal
        const modal = document.getElementById('serviceModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Modal đã mở thành công');
        }
    } catch (error) {
        console.error('Lỗi khi mở modal:', error);
        alert('Có lỗi xảy ra khi hiển thị chi tiết dịch vụ. Vui lòng thử lại.');
    }
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('modalClose');
    const closeBtn2 = document.getElementById('modalCloseBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (closeBtn2) {
        closeBtn2.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = document.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show a success message
        
        // Show success message
        alert(`Cảm ơn ${name}! Yêu cầu của bạn đã được gửi thành công. Tôi sẽ liên hệ với bạn qua email ${email} trong thời gian sớm nhất.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup active navigation on scroll
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
}

