// * - Empty search with restrictive filters → Should show empty state
//  * - Mobile responsive → All filters should work in mobile overlay
//  */

// ===== DUMMY DATA FOR TESTING =====
const DUMMY_COLLEGES = [
    {
        id: 1,
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi, Delhi",
        state: "Delhi",
        city: "New Delhi",
        type: "government",
        expectedCutoff: 95.5,
        annualFee: 84000,
        placementRating: 9.8,
        matchScore: 98,
        eligibility: "high",
        tags: ["Top Tier", "Government", "Hostel", "Research"],
        description: "Premier engineering institution with excellent research facilities and top-tier placements in technology companies.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1961,
        nirf_ranking: 2,
        accreditation: "NAAC A++",
        campus_size: "320 acres",
        total_students: 8500
    },
    {
        id: 2,
        name: "Indian Institute of Technology Bombay",
        location: "Mumbai, Maharashtra",
        state: "Maharashtra", 
        city: "Mumbai",
        type: "government",
        expectedCutoff: 96.2,
        annualFee: 87000,
        placementRating: 9.9,
        matchScore: 97,
        eligibility: "high",
        tags: ["Top Tier", "Government", "Hostel", "Research"],
        description: "Leading technical university known for innovation, research excellence, and industry partnerships.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1958,
        nirf_ranking: 3,
        accreditation: "NAAC A++",
        campus_size: "550 acres",
        total_students: 10200
    },
    {
        id: 3,
        name: "BITS Pilani",
        location: "Pilani, Rajasthan",
        state: "Rajasthan",
        city: "Pilani", 
        type: "private",
        expectedCutoff: 92.8,
        annualFee: 432000,
        placementRating: 9.4,
        matchScore: 94,
        eligibility: "high",
        tags: ["Private", "Industry Connect", "Hostel", "Research"],
        description: "Prestigious private university with strong industry connections and flexible academic programs.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1964,
        nirf_ranking: 24,
        accreditation: "NAAC A",
        campus_size: "200 acres", 
        total_students: 4200
    },
    {
        id: 4,
        name: "National Institute of Technology Karnataka",
        location: "Surathkal, Karnataka",
        state: "Karnataka",
        city: "Surathkal",
        type: "government", 
        expectedCutoff: 89.5,
        annualFee: 65000,
        placementRating: 9.1,
        matchScore: 91,
        eligibility: "high",
        tags: ["NIT", "Government", "Coastal", "Hostel"],
        description: "Top NIT with beautiful coastal campus and strong engineering programs across all branches.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1960,
        nirf_ranking: 13,
        accreditation: "NAAC A+",
        campus_size: "295 acres",
        total_students: 7800
    },
    {
        id: 5,
        name: "Delhi Technological University", 
        location: "New Delhi, Delhi",
        state: "Delhi",
        city: "New Delhi",
        type: "government",
        expectedCutoff: 87.2,
        annualFee: 71000,
        placementRating: 8.8,
        matchScore: 89,
        eligibility: "medium",
        tags: ["Government", "Delhi", "Industry Connect"],
        description: "Well-established technological university in the capital with good placement records and industry exposure.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1941,
        nirf_ranking: 36,
        accreditation: "NAAC A+",
        campus_size: "164 acres", 
        total_students: 9500
    },
    {
        id: 6,
        name: "Vellore Institute of Technology",
        location: "Vellore, Tamil Nadu", 
        state: "Tamil Nadu",
        city: "Vellore",
        type: "private",
        expectedCutoff: 85.4,
        annualFee: 195000,
        placementRating: 8.6,
        matchScore: 87,
        eligibility: "medium",
        tags: ["Private", "Large Campus", "Diverse", "International"],
        description: "Large private university with diverse student body and strong placement support across multiple industries.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1984,
        nirf_ranking: 18,
        accreditation: "NAAC A++",
        campus_size: "350 acres",
        total_students: 25000
    },
    {
        id: 7,
        name: "Manipal Institute of Technology",
        location: "Manipal, Karnataka",
        state: "Karnataka", 
        city: "Manipal",
        type: "private",
        expectedCutoff: 83.7,
        annualFee: 325000,
        placementRating: 8.4,
        matchScore: 85,
        eligibility: "medium",
        tags: ["Private", "Healthcare", "Research", "Hill Station"],
        description: "Renowned private institute in scenic hill station with multidisciplinary approach and research focus.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1957,
        nirf_ranking: 45,
        accreditation: "NAAC A+",
        campus_size: "313 acres",
        total_students: 8900
    },
    {
        id: 8,
        name: "PES University",
        location: "Bangalore, Karnataka",
        state: "Karnataka",
        city: "Bangalore", 
        type: "private",
        expectedCutoff: 81.5,
        annualFee: 412000,
        placementRating: 8.9,
        matchScore: 83,
        eligibility: "medium",
        tags: ["Private", "Tech Hub", "Industry Connect", "Startup Friendly"],
        description: "Premier private university in India's Silicon Valley with strong tech industry partnerships.",
        streams: ["computer-science", "electrical", "electronics"],
        established: 1972,
        nirf_ranking: 52,
        accreditation: "NAAC A++",
        campus_size: "25 acres",
        total_students: 12000
    },
    {
        id: 9,
        name: "Jadavpur University",
        location: "Kolkata, West Bengal",
        state: "West Bengal",
        city: "Kolkata",
        type: "government",
        expectedCutoff: 79.8,
        annualFee: 28000,
        placementRating: 8.7,
        matchScore: 81,
        eligibility: "medium",
        tags: ["Government", "Heritage", "Research", "Cultural Hub"],
        description: "Historic university with strong engineering programs and rich cultural heritage in the City of Joy.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1955,
        nirf_ranking: 28,
        accreditation: "NAAC A",
        campus_size: "58 acres", 
        total_students: 8200
    },
    {
        id: 10,
        name: "PSG College of Technology",
        location: "Coimbatore, Tamil Nadu",
        state: "Tamil Nadu",
        city: "Coimbatore",
        type: "private",
        expectedCutoff: 77.3,
        annualFee: 86000,
        placementRating: 8.2,
        matchScore: 79,
        eligibility: "medium", 
        tags: ["Private", "Affordable", "Industry Connect", "Tamil Nadu"],
        description: "Well-established private college with good industry connections and reasonable fee structure.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1951,
        nirf_ranking: 67,
        accreditation: "NAAC A",
        campus_size: "45 acres",
        total_students: 4500
    },
    {
        id: 11,
        name: "Anna University (CEG Campus)",
        location: "Chennai, Tamil Nadu", 
        state: "Tamil Nadu",
        city: "Chennai",
        type: "government",
        expectedCutoff: 75.6,
        annualFee: 45000,
        placementRating: 8.0,
        matchScore: 77,
        eligibility: "medium",
        tags: ["Government", "Heritage Campus", "Coastal", "Research"],
        description: "Historic government university with heritage campus and strong alumni network in South India.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1794,
        nirf_ranking: 42,
        accreditation: "NAAC A+",
        campus_size: "70 acres",
        total_students: 7200
    },
    {
        id: 12,
        name: "RV College of Engineering",
        location: "Bangalore, Karnataka",
        state: "Karnataka",
        city: "Bangalore",
        type: "private",
        expectedCutoff: 73.4,
        annualFee: 185000,
        placementRating: 7.9,
        matchScore: 75,
        eligibility: "low",
        tags: ["Private", "Bangalore", "Good Placements", "Tech Hub"],
        description: "Popular private engineering college in Bangalore with decent placement records and industry exposure.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1963,
        nirf_ranking: 78,
        accreditation: "NAAC A+",
        campus_size: "52 acres",
        total_students: 6800
    },
    {
        id: 13,
        name: "Bharati Vidyapeeth College of Engineering",
        location: "Pune, Maharashtra", 
        state: "Maharashtra",
        city: "Pune",
        type: "private",
        expectedCutoff: 71.2,
        annualFee: 125000,
        placementRating: 7.6,
        matchScore: 73,
        eligibility: "low",
        tags: ["Private", "Pune", "Affordable", "Good Infrastructure"],
        description: "Established private college in Pune with good infrastructure and moderate fee structure.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1983,
        nirf_ranking: 89,
        accreditation: "NAAC A",
        campus_size: "35 acres",
        total_students: 5200
    },
    {
        id: 14,
        name: "Government College of Engineering, Pune",
        location: "Pune, Maharashtra",
        state: "Maharashtra", 
        city: "Pune",
        type: "government",
        expectedCutoff: 69.8,
        annualFee: 36000,
        placementRating: 7.8,
        matchScore: 71,
        eligibility: "low",
        tags: ["Government", "Heritage", "Affordable", "Alumni Network"],
        description: "One of India's oldest engineering colleges with strong alumni network and affordable education.",
        streams: ["computer-science", "mechanical", "electrical", "electronics", "civil"],
        established: 1854,
        nirf_ranking: 95,
        accreditation: "NAAC A",
        campus_size: "51 acres",
        total_students: 3800
    },
    {
        id: 15,
        name: "Thiagarajar College of Engineering",
        location: "Madurai, Tamil Nadu",
        state: "Tamil Nadu",
        city: "Madurai",
        type: "private", 
        expectedCutoff: 67.5,
        annualFee: 95000,
        placementRating: 7.4,
        matchScore: 69,
        eligibility: "low",
        tags: ["Private", "South India", "Good Faculty", "Research"],
        description: "Reputed private engineering college with focus on quality education and research initiatives.",
        streams: ["computer-science", "mechanical", "electrical", "electronics"],
        established: 1957,
        nirf_ranking: 112,
        accreditation: "NAAC A",
        campus_size: "30 acres",
        total_students: 4200
    }
];

// Location suggestions for autocomplete
const LOCATION_SUGGESTIONS = [
    "Mumbai, Maharashtra",
    "New Delhi, Delhi", 
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Kolkata, West Bengal",
    "Ahmedabad, Gujarat",
    "Coimbatore, Tamil Nadu",
    "Kochi, Kerala"
];

// ===== UTILITY FUNCTIONS =====

class Utils {
    /**
     * Debounce function to limit API calls
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Format currency in Indian format
     */
    static formatCurrency(amount) {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        return `₹${(amount / 1000).toFixed(0)}K`;
    }

    /**
     * Format large numbers with K/L suffix
     */
    static formatNumber(num) {
        if (num >= 100000) {
            return `${(num / 100000).toFixed(1)}L`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}K`;
        }
        return num.toString();
    }

    /**
     * Animate element with CSS class
     */
    static animateElement(element, animationClass, duration = 400) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }

    /**
     * Check if user prefers reduced motion
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Smooth scroll to element
     */
    static smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        
        if (Utils.prefersReducedMotion()) {
            window.scrollTo(0, targetPosition);
            return;
        }

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== STATE MANAGEMENT =====

class AppState {
    constructor() {
        this.currentFilters = {
            percentile: 85,
            streams: ['computer-science'],
            location: '',
            feeMin: null,
            feeMax: null,
            collegeType: 'all',
            search: ''
        };
        
        this.currentSort = 'match';
        this.currentPage = 1;
        this.pageSize = 12;
        this.viewMode = 'grid'; // 'grid' or 'list'
        this.favorites = new Set();
        
        this.callbacks = {
            filtersChanged: [],
            dataUpdated: [],
            favoriteToggled: []
        };

        this.loadFromLocalStorage();
    }

    /**
     * Subscribe to state changes
     */
    subscribe(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    /**
     * Notify subscribers of state changes
     */
    notify(event, data = null) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => callback(data));
        }
    }

    /**
     * Update filters and notify subscribers
     */
    updateFilters(newFilters) {
        this.currentFilters = { ...this.currentFilters, ...newFilters };
        this.currentPage = 1; // Reset to first page
        this.saveToLocalStorage();
        this.notify('filtersChanged', this.currentFilters);
    }

    /**
     * Update sort option
     */
    updateSort(sortOption) {
        this.currentSort = sortOption;
        this.currentPage = 1;
        this.notify('filtersChanged');
    }

    /**
     * Update current page
     */
    updatePage(page) {
        this.currentPage = page;
        this.notify('filtersChanged');
    }

    /**
     * Toggle favorite status of a college
     */
    toggleFavorite(collegeId) {
        if (this.favorites.has(collegeId)) {
            this.favorites.delete(collegeId);
        } else {
            this.favorites.add(collegeId);
        }
        this.saveToLocalStorage();
        this.notify('favoriteToggled', { collegeId, isFavorited: this.favorites.has(collegeId) });
    }

    /**
     * Save state to localStorage
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('collegeSearch_state', JSON.stringify({
                filters: this.currentFilters,
                sort: this.currentSort,
                viewMode: this.viewMode,
                favorites: Array.from(this.favorites)
            }));
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }

    /**
     * Load state from localStorage
     */
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('collegeSearch_state');
            if (saved) {
                const state = JSON.parse(saved);
                this.currentFilters = { ...this.currentFilters, ...state.filters };
                this.currentSort = state.sort || 'match';
                this.viewMode = state.viewMode || 'grid';
                this.favorites = new Set(state.favorites || []);
            }
        } catch (error) {
            console.warn('Could not load from localStorage:', error);
        }
    }
}

// ===== DATA SERVICE =====

class CollegeDataService {
    /**
     * Fetch colleges based on filters
     * In production, replace this with actual API calls
     */
    static async fetchColleges(filters, sort, page, pageSize) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        let filteredColleges = [...DUMMY_COLLEGES];

        // Apply filters
        if (filters.percentile) {
            filteredColleges = filteredColleges.filter(college => {
                const minCutoff = Math.max(0, filters.percentile - 15);
                return college.expectedCutoff >= minCutoff;
            });
        }

        if (filters.streams && filters.streams.length > 0) {
            filteredColleges = filteredColleges.filter(college =>
                filters.streams.some(stream => college.streams.includes(stream))
            );
        }

        if (filters.location) {
            const locationLower = filters.location.toLowerCase();
            filteredColleges = filteredColleges.filter(college =>
                college.location.toLowerCase().includes(locationLower) ||
                college.city.toLowerCase().includes(locationLower) ||
                college.state.toLowerCase().includes(locationLower)
            );
        }

        if (filters.feeMin !== null) {
            filteredColleges = filteredColleges.filter(college =>
                college.annualFee >= filters.feeMin
            );
        }

        if (filters.feeMax !== null) {
            filteredColleges = filteredColleges.filter(college =>
                college.annualFee <= filters.feeMax
            );
        }

        if (filters.collegeType && filters.collegeType !== 'all') {
            filteredColleges = filteredColleges.filter(college =>
                college.type === filters.collegeType
            );
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredColleges = filteredColleges.filter(college =>
                college.name.toLowerCase().includes(searchLower) ||
                college.location.toLowerCase().includes(searchLower) ||
                college.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        // Apply sorting
        filteredColleges.sort((a, b) => {
            switch (sort) {
                case 'match':
                    return b.matchScore - a.matchScore;
                case 'cutoff-asc':
                    return a.expectedCutoff - b.expectedCutoff;
                case 'cutoff-desc':
                    return b.expectedCutoff - a.expectedCutoff;
                case 'fee-asc':
                    return a.annualFee - b.annualFee;
                case 'fee-desc':
                    return b.annualFee - a.annualFee;
                case 'placement':
                    return b.placementRating - a.placementRating;
                default:
                    return b.matchScore - a.matchScore;
            }
        });

        // Pagination
        const total = filteredColleges.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const colleges = filteredColleges.slice(startIndex, endIndex);

        return {
            colleges,
            total,
            page,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1
        };
    }

    /**
     * Fetch detailed information for a specific college
     * INTEGRATION POINT: Replace with actual API call
     */
    static async fetchCollegeDetails(collegeId) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const college = DUMMY_COLLEGES.find(c => c.id === collegeId);
        if (!college) {
            throw new Error('College not found');
        }

        // Return enhanced college data for modal
        return {
            ...college,
            detailedDescription: `${college.description} The institution has been consistently ranked among the top engineering colleges in India and offers state-of-the-art facilities including modern laboratories, well-equipped libraries, and excellent hostel accommodations.`,
            facilities: ['Library', 'Hostel', 'Sports Complex', 'Medical Center', 'Cafeteria', 'Labs'],
            cutoffHistory: [
                { year: 2023, cutoff: college.expectedCutoff },
                { year: 2022, cutoff: college.expectedCutoff - 1.2 },
                { year: 2021, cutoff: college.expectedCutoff - 0.8 }
            ],
            placementStats: {
                averagePackage: college.placementRating * 120000,
                highestPackage: college.placementRating * 200000,
                placementPercentage: Math.min(95, college.placementRating * 10)
            }
        };
    }

    /**
     * Toggle favorite status for a college
     * INTEGRATION POINT: Replace with actual API call
     */
    static async toggleFavorite(collegeId, isFavorited) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // In production, make POST request to /api/user/favorite
        // const response = await fetch('/api/user/favorite', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': getCsrfToken()
        //     },
        //     body: JSON.stringify({
        //         college_id: collegeId,
        //         is_favorited: isFavorited
        //     })
        // });
        
        return { success: true };
    }
}

// ===== UI COMPONENTS =====

class PercentileMeter {
    constructor(element) {
        this.element = element;
        this.progressPath = element.querySelector('.meter-progress');
        this.valueElement = element.querySelector('.meter-value');
        this.circumference = 251.2; // Calculated circumference of the arc
    }

    /**
     * Update meter display with animation
     */
    updateValue(percentile) {
        const percentage = percentile / 100;
        const dashOffset = this.circumference * (1 - percentage * 0.75); // 75% of arc for 100%
        
        if (!Utils.prefersReducedMotion()) {
            this.progressPath.style.strokeDashoffset = dashOffset;
        } else {
            this.progressPath.style.transition = 'none';
            this.progressPath.style.strokeDashoffset = dashOffset;
        }
        
        this.valueElement.textContent = `${percentile}%`;
    }
}

class CollegeCard {
    /**
     * Create HTML for a college card
     */
    static createCardHTML(college, isFavorited = false) {
        const eligibilityColor = college.eligibility === 'high' ? 'high' : 
                               college.eligibility === 'medium' ? 'medium' : 'low';
        
        const tagsHTML = college.tags.slice(0, 3).map(tag => 
            `<span class="college-tag">${tag}</span>`
        ).join('');

        return `
            <article class="college-card fade-in" data-college-id="${college.id}" tabindex="0" role="button">
                <div class="college-header">
                    <div class="college-info">
                        <h3>${college.name}</h3>
                        <div class="college-location">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            ${college.location}
                        </div>
                    </div>
                    <div class="eligibility-badge ${eligibilityColor}">
                        ${college.eligibility === 'high' ? 'High' : college.eligibility === 'medium' ? 'Medium' : 'Low'} Chance
                    </div>
                </div>

                <div class="college-stats">
                    <div class="stat-item">
                        <div class="stat-value">${college.expectedCutoff}%</div>
                        <div class="stat-label">Expected Cutoff</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${Utils.formatCurrency(college.annualFee)}</div>
                        <div class="stat-label">Annual Fee</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${college.placementRating}/10</div>
                        <div class="stat-label">Placement Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${college.type === 'government' ? 'Govt' : 'Private'}</div>
                        <div class="stat-label">Type</div>
                    </div>
                </div>

                <div class="college-tags">
                    ${tagsHTML}
                </div>

                <div class="college-description">
                    ${college.description}
                </div>

                <div class="college-footer">
                    <div class="match-score">
                        <span>Match: ${college.matchScore}%</span>
                        <div class="match-progress">
                            <div class="match-fill" style="width: ${college.matchScore}%"></div>
                        </div>
                    </div>
                    
                    <div class="college-actions">
                        <button class="action-btn favorite-btn ${isFavorited ? 'favorited' : ''}" 
                                data-college-id="${college.id}" 
                                aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
                                title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                            <svg width="20" height="20" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </button>
                        <button class="action-btn details-btn" 
                                data-college-id="${college.id}"
                                aria-label="View college details"
                                title="View Details">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
}

class Pagination {
    /**
     * Generate pagination HTML
     */
    static createPaginationHTML(currentPage, totalPages, hasNext, hasPrevious) {
        if (totalPages <= 1) return '';

        let paginationHTML = '<div class="pagination">';
        
        // Previous button
        paginationHTML += `
            <button class="page-btn" data-page="${currentPage - 1}" 
                    ${!hasPrevious ? 'disabled' : ''} aria-label="Previous page">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
            </button>
        `;

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            paginationHTML += `
                <button class="page-btn ${page === currentPage ? 'active' : ''}" 
                        data-page="${page}" aria-current="${page === currentPage ? 'page' : 'false'}">
                    ${page}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        paginationHTML += `
            <button class="page-btn" data-page="${currentPage + 1}" 
                    ${!hasNext ? 'disabled' : ''} aria-label="Next page">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
            </button>
        `;

        paginationHTML += '</div>';
        return paginationHTML;
    }
}

class Modal {
    constructor(modalElement) {
        this.modal = modalElement;
        this.closeBtn = modalElement.querySelector('.modal-close');
        this.modalContent = modalElement.querySelector('#modalContent');
        this.modalTitle = modalElement.querySelector('#modalCollegeName');
        
        this.bindEvents();
    }

    /**
     * Bind modal events
     */
    bindEvents() {
        // Close modal on close button click
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Close modal on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    /**
     * Open modal with college details
     */
    async open(collegeId) {
        try {
            // Show loading state
            this.modalContent.innerHTML = '<div class="loading-state">Loading...</div>';
            this.modalTitle.textContent = 'Loading...';
            
            // Show modal
            this.modal.style.display = 'flex';
            setTimeout(() => this.modal.classList.add('active'), 10);
            
            // Fetch college details
            const college = await CollegeDataService.fetchCollegeDetails(collegeId);
            
            // Update modal content
            this.modalTitle.textContent = college.name;
            this.modalContent.innerHTML = this.createModalContent(college);
            
            // Focus management for accessibility
            this.closeBtn.focus();
            
        } catch (error) {
            console.error('Error loading college details:', error);
            this.modalContent.innerHTML = '<div class="error-state">Failed to load college details</div>';
        }
    }

    /**
     * Close modal
     */
    close() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    }

    /**
     * Create modal content HTML
     */
    createModalContent(college) {
        const facilitiesHTML = college.facilities.map(facility => 
            `<span class="facility-tag">${facility}</span>`
        ).join('');

        const cutoffHistoryHTML = college.cutoffHistory.map(item => 
            `<div class="cutoff-item">
                <span class="cutoff-year">${item.year}</span>
                <span class="cutoff-value">${item.cutoff}%</span>
            </div>`
        ).join('');

        return `
            <div class="modal-college-details">
                <div class="modal-section">
                    <h3>About College</h3>
                    <p>${college.detailedDescription}</p>
                </div>

                <div class="modal-stats-grid">
                    <div class="modal-stat">
                        <div class="stat-value">${college.established}</div>
                        <div class="stat-label">Established</div>
                    </div>
                    <div class="modal-stat">
                        <div class="stat-value">${college.nirf_ranking}</div>
                        <div class="stat-label">NIRF Ranking</div>
                    </div>
                    <div class="modal-stat">
                        <div class="stat-value">${college.accreditation}</div>
                        <div class="stat-label">Accreditation</div>
                    </div>
                    <div class="modal-stat">
                        <div class="stat-value">${college.campus_size}</div>
                        <div class="stat-label">Campus Size</div>
                    </div>
                    <div class="modal-stat">
                        <div class="stat-value">${Utils.formatNumber(college.total_students)}</div>
                        <div class="stat-label">Total Students</div>
                    </div>
                    <div class="modal-stat">
                        <div class="stat-value">${college.type.charAt(0).toUpperCase() + college.type.slice(1)}</div>
                        <div class="stat-label">Type</div>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Facilities</h3>
                    <div class="facilities-grid">
                        ${facilitiesHTML}
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Placement Statistics</h3>
                    <div class="placement-stats">
                        <div class="placement-stat">
                            <div class="stat-value">${Utils.formatCurrency(college.placementStats.averagePackage)}</div>
                            <div class="stat-label">Average Package</div>
                        </div>
                        <div class="placement-stat">
                            <div class="stat-value">${Utils.formatCurrency(college.placementStats.highestPackage)}</div>
                            <div class="stat-label">Highest Package</div>
                        </div>
                        <div class="placement-stat">
                            <div class="stat-value">${college.placementStats.placementPercentage}%</div>
                            <div class="stat-label">Placement Rate</div>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Cutoff History</h3>
                    <div class="cutoff-history">
                        ${cutoffHistoryHTML}
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-primary">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                        Visit Website
                    </button>
                    <button class="btn btn-ghost">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        `;
    }
}

// ===== MAIN APPLICATION CLASS =====

class CollegeSearch {
    constructor() {
        this.state = new AppState();
        this.modal = null;
        this.percentileMeter = null;
        
        this.elements = this.initializeElements();
        this.initializeComponents();
        this.bindEvents();
        this.setupSubscriptions();
        
        // Load initial data
        this.loadColleges();
        
        console.log('CollegeSearch initialized successfully');
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        return {
            // Filter elements
            percentileSlider: document.getElementById('percentileSlider'),
            percentileInput: document.getElementById('percentileInput'),
            percentileMeter: document.getElementById('percentileMeter'),
            streamFilters: document.getElementById('streamFilters'),
            locationInput: document.getElementById('locationInput'),
            locationSuggestions: document.getElementById('locationSuggestions'),
            feeMin: document.getElementById('feeMin'),
            feeMax: document.getElementById('feeMax'),
            collegeTypeFilters: document.getElementById('collegeTypeFilters'),
            searchInput: document.getElementById('searchInput'),
            resetFilters: document.getElementById('resetFilters'),
            
            // Results elements
            resultsCount: document.getElementById('resultsCount'),
            resultsSubtitle: document.getElementById('resultsSubtitle'),
            sortSelect: document.getElementById('sortSelect'),
            viewToggle: document.getElementById('viewToggle'),
            resultsGrid: document.getElementById('resultsGrid'),
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'),
            paginationContainer: document.getElementById('paginationContainer'),
            
            // Modal elements
            collegeModal: document.getElementById('collegeModal'),
            
            // Mobile elements
            mobileFiltersToggle: document.getElementById('mobileFiltersToggle'),
            mobileFiltersOverlay: document.getElementById('mobileFiltersOverlay'),
            closeMobileFilters: document.getElementById('closeMobileFilters'),
            applyMobileFilters: document.getElementById('applyMobileFilters'),
            mobileResetFilters: document.getElementById('mobileResetFilters')
        };
    }

    /**
     * Initialize components
     */
    initializeComponents() {
        // Initialize percentile meter
        if (this.elements.percentileMeter) {
            this.percentileMeter = new PercentileMeter(this.elements.percentileMeter);
        }
        
        // Initialize modal
        if (this.elements.collegeModal) {
            this.modal = new Modal(this.elements.collegeModal);
        }
        
        // Set initial filter values from state
        this.updateUIFromState();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Percentile controls
        if (this.elements.percentileSlider) {
            this.elements.percentileSlider.addEventListener('input', 
                Utils.debounce((e) => this.handlePercentileChange(e.target.value), 100)
            );
        }
        
        if (this.elements.percentileInput) {
            this.elements.percentileInput.addEventListener('input', 
                Utils.debounce((e) => this.handlePercentileChange(e.target.value), 300)
            );
        }

        // Stream filters
        if (this.elements.streamFilters) {
            this.elements.streamFilters.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') {
                    this.handleStreamChange();
                }
            });
        }

        // Location input with autocomplete
        if (this.elements.locationInput) {
            this.elements.locationInput.addEventListener('input', 
                Utils.debounce((e) => this.handleLocationInput(e.target.value), 200)
            );
            
            this.elements.locationInput.addEventListener('blur', () => {
                setTimeout(() => this.hideLocationSuggestions(), 200);
            });
        }

        // Fee range inputs
        if (this.elements.feeMin) {
            this.elements.feeMin.addEventListener('input', 
                Utils.debounce(() => this.handleFeeRangeChange(), 500)
            );
        }
        
        if (this.elements.feeMax) {
            this.elements.feeMax.addEventListener('input', 
                Utils.debounce(() => this.handleFeeRangeChange(), 500)
            );
        }

        // Fee presets
        document.querySelectorAll('.fee-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const min = parseInt(e.target.dataset.min);
                const max = parseInt(e.target.dataset.max);
                this.setFeeRange(min, max);
            });
        });

        // College type filters
        if (this.elements.collegeTypeFilters) {
            this.elements.collegeTypeFilters.addEventListener('change', (e) => {
                if (e.target.type === 'radio') {
                    this.handleCollegeTypeChange(e.target.value);
                }
            });
        }

        // Search input
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', 
                Utils.debounce((e) => this.handleSearchChange(e.target.value), 300)
            );
        }

        // Sort control
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => {
                this.state.updateSort(e.target.value);
            });
        }

        // View toggle
        if (this.elements.viewToggle) {
            this.elements.viewToggle.addEventListener('click', () => {
                this.toggleViewMode();
            });
        }

        // Reset filters
        if (this.elements.resetFilters) {
            this.elements.resetFilters.addEventListener('click', () => {
                this.resetAllFilters();
            });
        }

        // Mobile filters
        if (this.elements.mobileFiltersToggle) {
            this.elements.mobileFiltersToggle.addEventListener('click', () => {
                this.showMobileFilters();
            });
        }

        if (this.elements.closeMobileFilters) {
            this.elements.closeMobileFilters.addEventListener('click', () => {
                this.hideMobileFilters();
            });
        }

        if (this.elements.applyMobileFilters) {
            this.elements.applyMobileFilters.addEventListener('click', () => {
                this.hideMobileFilters();
            });
        }

        // Results grid event delegation
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.addEventListener('click', (e) => {
                this.handleResultsGridClick(e);
            });
            
            this.elements.resultsGrid.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.handleResultsGridClick(e);
                }
            });
        }

        // Pagination event delegation
        if (this.elements.paginationContainer) {
            this.elements.paginationContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('page-btn') && !e.target.disabled) {
                    const page = parseInt(e.target.dataset.page);
                    if (page) {
                        this.state.updatePage(page);
                    }
                }
            });
        }
    }

    /**
     * Setup state subscriptions
     */
    setupSubscriptions() {
        this.state.subscribe('filtersChanged', () => {
            this.loadColleges();
        });

        this.state.subscribe('favoriteToggled', (data) => {
            this.updateFavoriteUI(data.collegeId, data.isFavorited);
        });
    }

    /**
     * Update UI elements from current state
     */
    updateUIFromState() {
        const filters = this.state.currentFilters;

        // Update percentile controls
        if (this.elements.percentileSlider) {
            this.elements.percentileSlider.value = filters.percentile;
        }
        if (this.elements.percentileInput) {
            this.elements.percentileInput.value = filters.percentile;
        }
        if (this.percentileMeter) {
            this.percentileMeter.updateValue(filters.percentile);
        }

        // Update stream checkboxes
        if (this.elements.streamFilters) {
            const checkboxes = this.elements.streamFilters.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = filters.streams.includes(checkbox.value);
            });
        }

        // Update location
        if (this.elements.locationInput) {
            this.elements.locationInput.value = filters.location;
        }

        // Update fee range
        if (this.elements.feeMin) {
            this.elements.feeMin.value = filters.feeMin || '';
        }
        if (this.elements.feeMax) {
            this.elements.feeMax.value = filters.feeMax || '';
        }

        // Update college type
        if (this.elements.collegeTypeFilters) {
            const radio = this.elements.collegeTypeFilters.querySelector(`input[value="${filters.collegeType}"]`);
            if (radio) radio.checked = true;
        }

        // Update search
        if (this.elements.searchInput) {
            this.elements.searchInput.value = filters.search;
        }

        // Update sort
        if (this.elements.sortSelect) {
            this.elements.sortSelect.value = this.state.currentSort;
        }
    }

    /**
     * Handle percentile change
     */
    handlePercentileChange(value) {
        const percentile = Math.max(0, Math.min(100, parseFloat(value) || 0));
        
        // Update both slider and input
        if (this.elements.percentileSlider) {
            this.elements.percentileSlider.value = percentile;
        }
        if (this.elements.percentileInput) {
            this.elements.percentileInput.value = percentile;
        }
        
        // Update meter
        if (this.percentileMeter) {
            this.percentileMeter.updateValue(percentile);
        }
        
        // Update state
        this.state.updateFilters({ percentile });
    }

    /**
     * Handle stream selection change
     */
    handleStreamChange() {
        if (!this.elements.streamFilters) return;
        
        const checkedBoxes = this.elements.streamFilters.querySelectorAll('input[type="checkbox"]:checked');
        const streams = Array.from(checkedBoxes).map(cb => cb.value);
        
        this.state.updateFilters({ streams });
    }

    /**
     * Handle location input with autocomplete
     */
    handleLocationInput(value) {
        const suggestions = LOCATION_SUGGESTIONS.filter(location =>
            location.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);

        this.showLocationSuggestions(suggestions, value);
        this.state.updateFilters({ location: value });
    }

    /**
     * Show location suggestions
     */
    showLocationSuggestions(suggestions, currentValue) {
        if (!this.elements.locationSuggestions) return;

        if (suggestions.length === 0 || !currentValue) {
            this.hideLocationSuggestions();
            return;
        }

        const suggestionsHTML = suggestions.map(suggestion => 
            `<div class="location-suggestion" data-location="${suggestion}">${suggestion}</div>`
        ).join('');

        this.elements.locationSuggestions.innerHTML = suggestionsHTML;
        this.elements.locationSuggestions.style.display = 'block';

        // Bind click events for suggestions
        this.elements.locationSuggestions.querySelectorAll('.location-suggestion').forEach(item => {
            item.addEventListener('click', (e) => {
                const location = e.target.dataset.location;
                this.elements.locationInput.value = location;
                this.state.updateFilters({ location });
                this.hideLocationSuggestions();
            });
        });
    }

    /**
     * Hide location suggestions
     */
    hideLocationSuggestions() {
        if (this.elements.locationSuggestions) {
            this.elements.locationSuggestions.style.display = 'none';
        }
    }

    /**
     * Handle fee range change
     */
    handleFeeRangeChange() {
        const feeMin = this.elements.feeMin?.value ? parseInt(this.elements.feeMin.value) : null;
        const feeMax = this.elements.feeMax?.value ? parseInt(this.elements.feeMax.value) : null;
        
        this.state.updateFilters({ feeMin, feeMax });
    }

    /**
     * Set fee range from preset
     */
    setFeeRange(min, max) {
        if (this.elements.feeMin) this.elements.feeMin.value = min;
        if (this.elements.feeMax) this.elements.feeMax.value = max;
        
        // Update active preset button
        document.querySelectorAll('.fee-preset').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activePreset = document.querySelector(`.fee-preset[data-min="${min}"][data-max="${max}"]`);
        if (activePreset) {
            activePreset.classList.add('active');
        }
        
        this.state.updateFilters({ feeMin: min, feeMax: max });
    }

    /**
     * Handle college type change
     */
    handleCollegeTypeChange(value) {
        this.state.updateFilters({ collegeType: value });
    }

    /**
     * Handle search input change
     */
    handleSearchChange(value) {
        this.state.updateFilters({ search: value });
    }

    /**
     * Toggle view mode between grid and list
     */
    toggleViewMode() {
        this.state.viewMode = this.state.viewMode === 'grid' ? 'list' : 'grid';
        this.state.saveToLocalStorage();
        
        // Update grid classes
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.classList.toggle('list-view', this.state.viewMode === 'list');
        }
        
        // Update toggle button icon
        const gridIcon = this.elements.viewToggle?.querySelector('.grid-icon');
        const listIcon = this.elements.viewToggle?.querySelector('.list-icon');
        
        if (gridIcon && listIcon) {
            if (this.state.viewMode === 'list') {
                gridIcon.style.display = 'none';
                listIcon.style.display = 'block';
            } else {
                gridIcon.style.display = 'block';
                listIcon.style.display = 'none';
            }
        }
    }

    /**
     * Reset all filters to defaults
     */
    resetAllFilters() {
        const defaultFilters = {
            percentile: 85,
            streams: ['computer-science'],
            location: '',
            feeMin: null,
            feeMax: null,
            collegeType: 'all',
            search: ''
        };
        
        this.state.updateFilters(defaultFilters);
        this.updateUIFromState();
        
        // Clear fee presets
        document.querySelectorAll('.fee-preset').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show feedback
        Utils.animateElement(this.elements.resetFilters, 'pulse');
    }

    /**
     * Show mobile filters overlay
     */
    showMobileFilters() {
        if (this.elements.mobileFiltersOverlay) {
            this.elements.mobileFiltersOverlay.style.display = 'block';
            setTimeout(() => {
                this.elements.mobileFiltersOverlay.classList.add('active');
            }, 10);
        }
    }

    /**
     * Hide mobile filters overlay
     */
    hideMobileFilters() {
        if (this.elements.mobileFiltersOverlay) {
            this.elements.mobileFiltersOverlay.classList.remove('active');
            setTimeout(() => {
                this.elements.mobileFiltersOverlay.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Handle clicks on results grid (event delegation)
     */
    handleResultsGridClick(e) {
        const card = e.target.closest('.college-card');
        const favoriteBtn = e.target.closest('.favorite-btn');
        const detailsBtn = e.target.closest('.details-btn');
        
        if (favoriteBtn) {
            e.preventDefault();
            e.stopPropagation();
            const collegeId = parseInt(favoriteBtn.dataset.collegeId);
            this.toggleFavorite(collegeId);
        } else if (detailsBtn) {
            e.preventDefault();
            e.stopPropagation();
            const collegeId = parseInt(detailsBtn.dataset.collegeId);
            this.showCollegeDetails(collegeId);
        } else if (card) {
            const collegeId = parseInt(card.dataset.collegeId);
            this.showCollegeDetails(collegeId);
        }
    }

    /**
     * Toggle favorite status of a college
     */
    async toggleFavorite(collegeId) {
        try {
            const wasFavorited = this.state.favorites.has(collegeId);
            
            // Optimistic update
            this.state.toggleFavorite(collegeId);
            
            // Make API call
            await CollegeDataService.toggleFavorite(collegeId, !wasFavorited);
            
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // Revert optimistic update on failure
            this.state.toggleFavorite(collegeId);
        }
    }

    /**
     * Update favorite button UI
     */
    updateFavoriteUI(collegeId, isFavorited) {
        const favoriteBtn = document.querySelector(`.favorite-btn[data-college-id="${collegeId}"]`);
        if (favoriteBtn) {
            favoriteBtn.classList.toggle('favorited', isFavorited);
            favoriteBtn.setAttribute('aria-label', isFavorited ? 'Remove from favorites' : 'Add to favorites');
            favoriteBtn.setAttribute('title', isFavorited ? 'Remove from favorites' : 'Add to favorites');
            
            const svg = favoriteBtn.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', isFavorited ? 'currentColor' : 'none');
            }
            
            // Add micro-animation
            Utils.animateElement(favoriteBtn, 'pulse', 200);
        }
    }

    /**
     * Show college details in modal
     */
    showCollegeDetails(collegeId) {
        if (this.modal) {
            this.modal.open(collegeId);
        }
    }

    /**
     * Load colleges based on current filters
     */
    async loadColleges() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Fetch data
            const result = await CollegeDataService.fetchColleges(
                this.state.currentFilters,
                this.state.currentSort,
                this.state.currentPage,
                this.state.pageSize
            );
            
            // Update UI
            this.displayResults(result);
            this.updateResultsInfo(result);
            this.updatePagination(result);
            
            // Hide loading state
            this.hideLoadingState();
            
            // Scroll to top of results on new search
            if (this.state.currentPage === 1 && this.elements.resultsGrid) {
                Utils.smoothScrollTo(this.elements.resultsGrid, 80);
            }
            
        } catch (error) {
            console.error('Error loading colleges:', error);
            this.showErrorState();
        }
    }

    /**
     * Display search results
     */
    displayResults(result) {
        if (!this.elements.resultsGrid) return;

        if (result.colleges.length === 0) {
            this.showEmptyState();
            return;
        }

        // Generate cards HTML
        const cardsHTML = result.colleges.map(college => {
            const isFavorited = this.state.favorites.has(college.id);
            return CollegeCard.createCardHTML(college, isFavorited);
        }).join('');

        // Update grid
        this.elements.resultsGrid.innerHTML = cardsHTML;
        
        // Apply view mode
        this.elements.resultsGrid.classList.toggle('list-view', this.state.viewMode === 'list');

        // Animate cards if motion is not reduced
        if (!Utils.prefersReducedMotion()) {
            const cards = this.elements.resultsGrid.querySelectorAll('.college-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }

        this.hideEmptyState();
    }

    /**
     * Update results information display
     */
    updateResultsInfo(result) {
        if (this.elements.resultsCount) {
            const countElement = this.elements.resultsCount.querySelector('.count-number');
            if (countElement) {
                countElement.textContent = result.total;
            }
        }

        if (this.elements.resultsSubtitle) {
            const { percentile, streams, location } = this.state.currentFilters;
            let subtitle = 'Based on your preferences';
            
            if (percentile) {
                subtitle = `For ${percentile}% percentile`;
                if (streams.length > 0) {
                    subtitle += ` in ${streams.join(', ')}`;
                }
                if (location) {
                    subtitle += ` near ${location}`;
                }
            }
            
            this.elements.resultsSubtitle.textContent = subtitle;
        }
    }

    /**
     * Update pagination controls
     */
    updatePagination(result) {
        if (!this.elements.paginationContainer) return;

        const paginationHTML = Pagination.createPaginationHTML(
            result.page,
            result.totalPages,
            result.hasNext,
            result.hasPrevious
        );

        this.elements.paginationContainer.innerHTML = paginationHTML;
        
        // Show/hide pagination container
        this.elements.paginationContainer.style.display = 
            result.totalPages > 1 ? 'block' : 'none';
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        if (this.elements.loadingState) {
            this.elements.loadingState.style.display = 'block';
        }
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.style.display = 'none';
        }
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = 'none';
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        if (this.elements.loadingState) {
            this.elements.loadingState.style.display = 'none';
        }
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.style.display = 'grid';
        }
    }

    /**
     * Show empty state when no results
     */
    showEmptyState() {
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = 'block';
            
            // Bind reset button in empty state
            const resetBtn = this.elements.emptyState.querySelector('#resetSearch');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.resetAllFilters();
                });
            }
        }
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.style.display = 'none';
        }
        if (this.elements.paginationContainer) {
            this.elements.paginationContainer.style.display = 'none';
        }
    }

    /**
     * Hide empty state
     */
    hideEmptyState() {
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = 'none';
        }
    }

    /**
     * Show error state
     */
    showErrorState() {
        if (this.elements.resultsGrid) {
            this.elements.resultsGrid.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">
                        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h3>Something went wrong</h3>
                    <p>Unable to load colleges. Please try again.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        Refresh Page
                    </button>
                </div>
            `;
            this.elements.resultsGrid.style.display = 'block';
        }
        this.hideLoadingState();
        this.hideEmptyState();
    }

    /**
     * Get CSRF token for Django integration
     */
    getCSRFToken() {
        const token = document.querySelector('[name=csrfmiddlewaretoken]');
        return token ? token.value : '';
    }
}

// ===== ADDITIONAL UTILITY STYLES (Injected via JavaScript) =====
const additionalStyles = `
<style>
/* Modal content styles not in main CSS */
.modal-college-details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.modal-section h3 {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-primary);
}

.modal-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.modal-stat {
    text-align: center;
    padding: 1rem;
    background: var(--bg-glass);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-secondary);
}

.facilities-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.facility-tag {
    padding: 0.5rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
}

.placement-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.placement-stat {
    text-align: center;
    padding: 1rem;
    background: var(--bg-glass);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-secondary);
}

.cutoff-history {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.cutoff-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--bg-glass);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-secondary);
}

.cutoff-year {
    font-weight: 600;
    color: var(--text-primary);
}

.cutoff-value {
    font-weight: 700;
    color: var(--primary-400);
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-primary);
}

.error-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--bg-glass);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-xl);
    grid-column: 1 / -1;
}

.error-icon {
    color: var(--text-muted);
    opacity: 0.5;
    margin-bottom: 1rem;
}

.error-state h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.error-state p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.page-ellipsis {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    color: var(--text-muted);
    font-weight: 600;
}

/* Loading skeleton animations */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

/* Responsive modal styles */
@media (max-width: 768px) {
    .modal-stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .placement-stats {
        grid-template-columns: 1fr;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}

/* Focus indicators for better accessibility */
.college-card:focus-visible {
    outline: 2px solid var(--primary-400);
    outline-offset: 2px;
}

.favorite-btn:focus-visible,
.details-btn:focus-visible {
    outline: 2px solid var(--primary-400);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .college-card {
        border-width: 2px;
    }
    
    .eligibility-badge {
        border: 2px solid currentColor;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .college-card,
    .modal-overlay,
    .mobile-filters-overlay {
        transition: none !important;
        animation: none !important;
    }
    
    .college-card:nth-child(n) {
        animation-delay: 0s !important;
    }
}
</style>
`;

// Inject additional styles into head
if (typeof document !== 'undefined') {
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
}

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('College Search Error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'global-error-notification';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Something went wrong. Please refresh the page.
            </div>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// ===== AUTO-INITIALIZATION =====
// The CollegeSearch class will be instantiated from the HTML file
// when the DOM is ready, as shown in the HTML script tag

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        CollegeSearch, 
        CollegeDataService, 
        Utils, 
        AppState,
        CollegeCard,
        Pagination,
        Modal,
        PercentileMeter
    };
}

/**
 * ===== INTEGRATION GUIDE FOR DJANGO DEVELOPERS =====
 * 
 * To integrate this frontend with your Django backend:
 * 
 * 1. CREATE API ENDPOINTS:
 *    - GET /api/colleges/ - Search colleges
 *    - POST /api/colleges/favorite/ - Toggle favorite
 *    - GET /api/colleges/{id}/ - Get college details
 * 
 * 2. UPDATE CollegeDataService.fetchColleges():
 *    Replace the dummy data logic with:
 *    ```javascript
 *    const params = new URLSearchParams({
 *        percentile: filters.percentile,
 *        location: filters.location,
 *        fee_min: filters.feeMin || '',
 *        fee_max: filters.feeMax || '',
 *        college_type: filters.collegeType,
 *        search: filters.search,
 *        sort: sort,
 *        page: page,
 *        page_size: pageSize
 *    });
 *    
 *    // Add stream filters as array
 *    filters.streams.forEach(stream => {
 *        params.append('streams[]', stream);
 *    });
 *    
 *    const response = await fetch(`/api/colleges/?${params}`, {
 *        headers: {
 *            'X-Requested-With': 'XMLHttpRequest',
 *        }
 *    });
 *    
 *    if (!response.ok) {
 *        throw new Error('Failed to fetch colleges');
 *    }
 *    
 *    return await response.json();
 *    ```
 * 
 * 3. UPDATE FAVORITE FUNCTIONALITY:
 *    Replace CollegeDataService.toggleFavorite() with:
 *    ```javascript
 *    const response = await fetch('/api/colleges/favorite/', {
 *        method: 'POST',
 *        headers: {
 *            'Content-Type': 'application/json',
 *            'X-CSRFToken': this.getCSRFToken(),
 *            'X-Requested-With': 'XMLHttpRequest',
 *        },
 *        body: JSON.stringify({
 *            college_id: collegeId,
 *            is_favorited: isFavorited
 *        })
 *    });
 *    ```
 * 
 * 4. SAMPLE DJANGO VIEWS:
 *    ```python
 *    from django.http import JsonResponse
 *    from django.views.decorators.csrf import csrf_exempt
 *    from django.contrib.auth.decorators import login_required
 *    
 *    def college_search(request):
 *        percentile = request.GET.get('percentile')
 *        streams = request.GET.getlist('streams[]')
 *        location = request.GET.get('location', '')
 *        # ... process other filters
 *        
 *        colleges = College.objects.filter(
 *            # Apply your filtering logic here
 *        )
 *        
 *        # Pagination
 *        paginator = Paginator(colleges, page_size)
 *        page_obj = paginator.get_page(page)
 *        
 *        return JsonResponse({
 *            'colleges': [serialize_college(c) for c in page_obj],
 *            'total': paginator.count,
 *            'page': page_obj.number,
 *            'total_pages': paginator.num_pages,
 *            'has_next': page_obj.has_next(),
 *            'has_previous': page_obj.has_previous()
 *        })
 *    ```
 * 
 * 5. EXPECTED DATA FORMAT:
 *    Each college object should have these fields:
 *    {
 *        "id": 1,
 *        "name": "College Name",
 *        "location": "City, State", 
 *        "state": "State",
 *        "city": "City",
 *        "type": "government|private",
 *        "expectedCutoff": 85.5,
 *        "annualFee": 100000,
 *        "placementRating": 8.5,
 *        "matchScore": 90,
 *        "eligibility": "high|medium|low",
 *        "tags": ["Tag1", "Tag2"],
 *        "description": "College description...",
 *        "streams": ["computer-science", "mechanical"],
 *        "established": 1990,
 *        "nirf_ranking": 25,
 *        "accreditation": "NAAC A+",
 *        "campus_size": "100 acres",
 *        "total_students": 5000
 *    }
 *//**
 * ===== COLLEGE SEARCH MODULE =====
 * 
 * This module handles all client-side functionality for the college search page.
 * It provides filtering, sorting, pagination, and UI interactions without requiring
 * any external frameworks - just modern ES6 JavaScript.
 * 
 * INTEGRATION NOTES FOR DJANGO BACKEND:
 * 
 * 1. API ENDPOINTS NEEDED:
 *    - GET /api/colleges - Search colleges with query parameters
 *    - POST /api/user/favorite - Save/unsave college favorites
 *    - GET /api/colleges/{id} - Get detailed college information
 * 
 * 2. TO INTEGRATE WITH DJANGO:
 *    - Replace DUMMY_COLLEGES data with API calls
 *    - Update CollegeDataService.fetchColleges() method
 *    - Add CSRF token handling for POST requests
 *    - Update URL patterns to match your Django routes
 * 
 * 3. SAMPLE API CONTRACT:
 *    Request: GET /api/colleges?percentile=85&streams[]=computer-science&location=Mumbai&fee_min=0&fee_max=500000&sort=match&page=1&page_size=12
 *    Response: {
 *      "colleges": [...college objects...],
 *      "total": 156,
 *      "page": 1,
 *      "total_pages": 13,
 *      "has_next": true,
 *      "has_previous": false
 *    }
 * 
 * HOW TO RUN LOCALLY:
 * 1. Open search.html in a web browser
 * 2. All functionality works with dummy data
 * 3. No build tools required
 * 
 * TEST SCENARIOS:
 * - High percentile (98) + CS stream → Should show top-tier colleges
 * - Low percentile (50) + any stream → Should show regional colleges
 * - Fee range < 1L → Should filter to government colleges*/
