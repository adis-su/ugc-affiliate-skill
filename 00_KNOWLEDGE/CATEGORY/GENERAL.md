# AFFILIX — General Category Knowledge

General adalah category knowledge untuk product yang tidak cukup terwakili oleh category khusus seperti Beauty, Fashion, Home, atau Gadget.

Dokumen ini menyediakan **general-purpose patterns dan considerations**, bukan Product Truth. Informasi spesifik product tetap berasal dari Product Truth dan sumber yang tersedia.

## 1. Category Scope

General dapat digunakan untuk:
- stationery
- books
- hobby products
- sports accessories
- travel products
- pet products
- automotive accessories
- office supplies
- toys
- lifestyle products
- miscellaneous consumer goods

Category khusus tetap harus dipilih jika product memiliki domain-specific requirements yang lebih tepat.

## 2. Category Selection

Gunakan General ketika:
- product tidak cocok dengan category khusus
- product memiliki fungsi lintas kategori
- domain-specific rules belum diperlukan
- product masih berada dalam tahap classification

General tidak boleh digunakan untuk menghindari aturan category-specific yang relevan.

## 3. Common Content Contexts

General products dapat menggunakan:
- demonstration
- tutorial
- review
- comparison
- unboxing
- problem-solution
- routine
- storytelling
- POV

Format dipilih berdasarkan Content Strategy.

## 4. Product Identity

Product identity secara umum dapat mencakup:
- brand
- product name
- model
- variant
- color
- shape
- dimensions jika diketahui
- material jika diketahui
- components
- packaging
- markings
- included accessories

Attribute yang belum diketahui harus tetap unknown.

## 5. Product State

Gunakan state untuk membedakan identity dari kondisi penggunaan.

Contoh:

**OBJECT**
- packaged
- closed
- open
- held
- placed
- in use
- completed

State bergantung pada jenis product.

Identity tidak boleh berubah ketika state berubah.

## 6. Interaction Logic

Setiap interaction harus memiliki physical cause.

Pattern:

**CURRENT STATE → ACTION → NEW STATE**

Contoh:

**Object CLOSED → Opened by character → Object OPEN**

Jika action penting bagi narrative, transition harus terlihat atau dapat dipahami.

## 7. Environment

Environment harus sesuai dengan product context.

Track:
- location
- surface
- background
- props
- lighting
- spatial arrangement

Environment yang penting bagi continuity harus masuk ke Reference State.

## 8. Character Interaction

Character dapat:
- hold
- inspect
- open
- close
- use
- place
- carry
- demonstrate
- compare

Character Identity tetap konsisten.

Character State dapat berubah mengikuti action dan narrative.

## 9. Material and Construction

Jika material atau construction penting:
- gunakan Product Truth
- gunakan source yang dapat dipercaya
- jangan infer exact material dari generated appearance

Visual appearance dapat digunakan sebagai observation jika memang terlihat, tetapi bukan otomatis material specification.

## 10. Size and Measurement

Generated image tidak boleh digunakan sebagai exact measurement.

Claims seperti:
- "10 cm"
- "500 g"
- "fits X liters"
- "supports X kg"

harus memiliki source.

Perceived scale dapat berubah karena:
- camera
- lens perspective
- distance
- character proportions
- object placement

## 11. Performance Claims

Untuk product yang memiliki performance:
- identify the claimed property
- identify the available evidence
- distinguish product fact from observation
- avoid universal conclusions from a single visual

Character reaction bukan proof of objective performance.

## 12. Sensory Claims

Sensory attributes seperti:
- smell
- taste
- texture
- comfort
- sound quality
- feel

tidak dapat dibuktikan hanya melalui generated visual.

Jika digunakan:
- present as documented product information when sourced
- present as personal observation when genuinely based on known experience
- do not manufacture testimonial experience

## 13. Safety-Relevant Products

Untuk products yang melibatkan:
- heat
- electricity
- sharp edges
- chemicals
- pressure
- heavy loads
- moving mechanisms
- vehicles

interaction harus physically plausible dan tidak boleh mengarang safety properties.

## 14. Comparison

General products dapat dibandingkan berdasarkan:
- form
- feature
- material
- dimensions
- workflow
- price
- configuration
- observable differences

Comparison criteria harus memiliki basis yang sesuai.

## 15. Script Pattern

General product content dapat menggunakan:

```text
HOOK
CONTEXT
PRODUCT INTRO
ACTION / USE
OBSERVATION
CONTEXTUAL VALUE
CTA
```

Struktur dapat berubah sesuai format yang dipilih.

## 16. Storyboard Pattern

Storyboard dapat mendefinisikan:
- product state
- character state
- environment state
- action
- camera
- dialogue
- transition
- observable change

Jika product memiliki state yang kompleks, state harus ditentukan sebelum prompt generation.

## 17. Reference System

Reference State secara umum harus menjaga:
- product identity
- product state
- character identity
- character state
- environment
- camera
- lighting
- spatial relationship
- relevant props

Reference harus dibuat pada state yang penting bagi downstream generation.

## 18. Naturalization

Naturalization dapat menambahkan:
- blinking
- breathing
- micro-expression
- hand repositioning
- subtle body movement
- camera movement
- autofocus
- realistic object response

Naturalization tidak boleh mengubah required state atau identity.

## 19. Common Category Failure Modes

### Wrong Category Assumption
Product diperlakukan seperti category lain tanpa dasar.

### Identity Drift
Product berubah shape, color, model, atau configuration.

### State Jump
Object tiba-tiba berpindah atau berubah state.

### Material Invention
Material dibuat-buat dari appearance.

### Measurement Invention
Exact size/weight/capacity dibuat tanpa source.

### Performance Overclaim
Visual reaction dianggap bukti performance.

### Sensory Fabrication
Character seolah mengalami taste, smell, comfort, atau sound quality yang tidak memiliki basis.

### Environment Drift
Background dan spatial layout berubah.

### Interaction Impossibility
Product digunakan dengan cara yang tidak physically plausible.

## 20. Best Use Contexts

General category cocok dipertimbangkan ketika:
- product lintas kategori
- product niche
- category-specific knowledge belum diperlukan
- content lebih bergantung pada general production rules

Jika product kemudian membutuhkan rules khusus, category knowledge dapat diperluas tanpa mengubah Product Truth.

## 21. Non-Negotiable Rules

1. Product Truth tetap menjadi source of truth.
2. General tidak berarti bebas dari category-specific constraints.
3. Product Identity harus konsisten.
4. Product State harus memiliki logical transition.
5. Material, measurement, capacity, dan performance tidak boleh diinvent.
6. Sensory claims harus dibedakan dari visual observation.
7. Environment continuity harus dijaga.
8. Character Identity tetap konsisten.
9. Safety-relevant interactions harus physically plausible.
10. Unknown information harus tetap unknown sampai source tersedia.
