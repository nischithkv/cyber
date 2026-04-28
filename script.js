// Mobile Navigation Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileBtn) {
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 6, 23, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(2, 6, 23, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset forms and results
        const resultsAreas = modal.querySelectorAll('.results-area');
        resultsAreas.forEach(area => {
            area.classList.add('hidden');
            area.innerHTML = '';
        });
        
        const inputs = modal.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => input.value = '');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Tab Switching
function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabId);
    targetTab.classList.remove('hidden');
    // small delay to allow display:block to apply before animating opacity
    setTimeout(() => {
        targetTab.classList.add('active');
    }, 10);
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
}

// Simulator Functions
function simulateScan() {
    const input = document.getElementById('scan-input').value;
    const type = document.getElementById('scan-type').value;
    const resultsArea = document.getElementById('scan-results');
    
    if (!input) {
        alert('Please enter a value to scan.');
        return;
    }
    
    // Show scanning state
    resultsArea.classList.remove('hidden');
    resultsArea.className = 'results-area'; // Reset classes
    resultsArea.innerHTML = `
        <div class="result-header">
            <i class="fa-solid fa-circle-notch fa-spin"></i> Scanning Database...
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <div class="result-details">Checking ${type} against National Cyber Crime registries...</div>
    `;
    
    // Animate progress
    setTimeout(() => {
        const fill = resultsArea.querySelector('.progress-fill');
        if (fill) fill.style.width = '100%';
    }, 100);
    
    // Simulate delay and random result
    setTimeout(() => {
        const isThreat = Math.random() > 0.5; // 50% chance for demo
        
        if (isThreat) {
            resultsArea.className = 'results-area danger';
            resultsArea.innerHTML = `
                <div class="result-header">
                    <i class="fa-solid fa-triangle-exclamation"></i> HIGH THREAT DETECTED
                </div>
                <div class="result-details">
                    <p><strong>Target:</strong> ${input}</p>
                    <p><strong>Status:</strong> Found in multiple scam reports.</p>
                    <p><strong>Action:</strong> Block immediately and do not engage. Report to 1930.</p>
                </div>
            `;
        } else {
            resultsArea.className = 'results-area safe';
            resultsArea.innerHTML = `
                <div class="result-header">
                    <i class="fa-solid fa-shield-check"></i> NO THREATS FOUND
                </div>
                <div class="result-details">
                    <p><strong>Target:</strong> ${input}</p>
                    <p><strong>Status:</strong> Not present in our current threat database.</p>
                    <p><strong>Note:</strong> Still exercise caution. New scams appear daily.</p>
                </div>
            `;
        }
    }, 2000);
}

function simulateAI() {
    let resultsArea = document.getElementById('ai-results');
    
    // Show analyzing state
    resultsArea.classList.remove('hidden');
    resultsArea.className = 'results-area'; // Reset classes
    resultsArea.innerHTML = `
        <div class="result-header">
            <i class="fa-solid fa-brain fa-pulse"></i> AI Pattern Analysis in Progress...
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <div class="result-details">Analyzing syntax, psychological triggers, and known scam vectors...</div>
    `;
    
    // Animate progress
    setTimeout(() => {
        const fill = resultsArea.querySelector('.progress-fill');
        if (fill) fill.style.width = '100%';
    }, 100);
    
    // Simulate delay and result
    setTimeout(() => {
        resultsArea.className = 'results-area danger';
        resultsArea.innerHTML = `
            <div class="result-header">
                <i class="fa-solid fa-bug"></i> SUSPICIOUS PATTERN DETECTED (92% Confidence)
            </div>
            <div class="result-details">
                <p><strong>Analysis:</strong> The text contains classic urgency triggers and requests for personal information common in Phishing attempts.</p>
                <p><strong>Flags:</strong> "Account Suspended", "Verify immediately", Suspicious URL structure.</p>
                <p><strong>Recommendation:</strong> Do not click any links. Delete the message.</p>
            </div>
        `;
    }, 2500);
}

function submitReport() {
    const btn = document.querySelector('#anonymous-modal .btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Report Submitted Safely';
        btn.classList.remove('btn-secondary');
        btn.style.backgroundColor = '#10b981';
        btn.style.color = 'white';
        btn.style.borderColor = '#10b981';
        
        setTimeout(() => {
            closeModal('anonymous-modal');
            // Reset button
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.add('btn-secondary');
                btn.style = '';
            }, 500);
        }, 2000);
    }, 1500);
}