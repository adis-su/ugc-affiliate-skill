# AFFILIX — Home Category Knowledge

Home adalah category knowledge untuk produk dan konten yang berkaitan dengan rumah, kitchen, organization, cleaning, furniture, decor, storage, household tools, dan kebutuhan living sehari-hari.

Dokumen ini menyediakan **pattern dan considerations**, bukan Product Truth. Informasi spesifik product tetap berasal dari project Product Truth dan sumber yang tersedia.

## 1. Category Scope

Home dapat mencakup:
- kitchen products
- cleaning products
- storage
- organization
- furniture
- home decor
- household tools
- lighting
- bedding
- tableware
- small home appliances

Product dapat overlap dengan gadget atau category lain.

## 2. Common Content Contexts

Home content sering menggunakan:
- demonstration
- tutorial
- routine
- problem-solution
- review
- unboxing
- comparison
- storytelling
- POV

Format dipilih berdasarkan Content Strategy.

## 3. Environment Is Product Context

Dalam home content, environment sering menjadi bagian penting dari product presentation.

Perhatikan:
- room
- surface
- furniture
- wall
- floor
- lighting
- background objects
- spatial layout

Environment harus diperlakukan sebagai state, bukan sekadar background decoration.

## 4. Product Identity

Home product identity dapat mencakup:
- brand
- product name
- model
- variant
- dimensions jika diketahui
- shape
- color
- material jika diketahui
- controls
- attachments
- hardware
- packaging
- visible markings

Dimensions dan material tidak boleh diinvent jika tidak tersedia.

## 5. Product State

Home products sering memiliki state yang berubah melalui physical interaction.

Contoh:

**Storage box**
- closed
- opened
- empty
- filled
- placed

**Cleaning tool**
- idle
- held
- in use
- placed

**Appliance**
- off
- on
- active
- idle

State harus memiliki logical transition.

## 6. Spatial Continuity

Spatial continuity sangat penting.

Track:
- product location
- object placement
- character position
- surface
- orientation
- distance
- room layout

Jika product berada di meja pada Reference State, jangan tiba-tiba muncul di lantai tanpa action.

## 7. Household Objects

Props dapat membantu menunjukkan context.

Namun props yang penting untuk continuity harus tetap konsisten.

Jangan:
- menambah object tanpa alasan
- menghapus object yang seharusnya tetap ada
- mengubah furniture
- mengubah room layout
- memindahkan object tanpa interaction

## 8. Before / After

Home content sering menggunakan before/after.

Struktur:

**BEFORE → ACTION → TRANSITION → AFTER**

Before/after harus memperlihatkan perubahan yang berasal dari action atau kondisi yang memang diketahui.

Jangan membuat "after" sebagai visual proof dari performance claim jika Product Truth tidak mendukungnya.

## 9. Cleaning Content

Cleaning demonstration membutuhkan perhatian pada:
- starting condition
- target surface
- tool/product state
- action
- observable change
- ending condition

Jika dirt/stain digunakan sebagai visual element, jangan membuat kondisi tersebut menjadi klaim performa produk secara universal.

## 10. Kitchen Content

Kitchen content membutuhkan perhatian pada:
- food state
- utensil state
- container
- ingredient placement
- heat source jika applicable
- product interaction
- hygiene context

Generated visuals tidak boleh menyiratkan kemampuan product yang tidak diketahui.

## 11. Storage and Organization

Organization content dapat menunjukkan:

**CLUTTERED → SORTING → ORGANIZED**

Namun jumlah object, storage capacity, atau exact dimensions harus berasal dari Product Truth jika dinyatakan sebagai fact.

Jangan membuat container terlihat memiliki kapasitas tertentu hanya berdasarkan generated visual.

## 12. Furniture and Decor

Furniture/decor membutuhkan continuity pada:
- scale
- position
- orientation
- color
- surface
- surrounding layout

Camera angle dapat membuat furniture terlihat berbeda ukuran.

Visual scale bukan measurement.

## 13. Appliances

Appliances dapat memiliki state:

**OFF → ON → ACTIVE → OFF**

Jika controls terlihat, posisi control dan interaction harus konsisten.

Jika appliance menghasilkan output tertentu, output tersebut harus sesuai dengan known product behavior.

## 14. Safety-Relevant Context

Untuk products yang melibatkan:
- electricity
- heat
- sharp components
- chemicals
- heavy objects
- moving mechanisms

Visual interaction harus tetap physically plausible.

Jangan mengajarkan penggunaan yang berbahaya atau membuat product terlihat aman untuk use case yang tidak diketahui.

## 15. Camera and Framing

Useful framing dapat mencakup:
- wide room shot
- countertop shot
- overhead
- close-up
- hands-in-frame
- POV
- before/after split or matched framing

Matched framing sangat berguna untuk direct before/after comparison.

## 16. Lighting and Environment

Home scenes sering menggunakan lighting yang berubah berdasarkan:
- time of day
- room light
- window light
- artificial light
- activity

Jika lighting berubah sebagai bagian dari timeline, perubahan harus disengaja.

Untuk comparison atau before/after, lighting sebaiknya konsisten jika tujuannya menunjukkan visual difference.

## 17. Character Interaction

Character dapat:
- pick up
- place
- open
- close
- clean
- organize
- assemble
- adjust
- operate

Hand placement dan object contact harus mengikuti action.

Character Identity tetap konsisten.

## 18. Script Pattern

Home content dapat menggunakan:

```text
HOOK
HOME CONTEXT
PRODUCT INTRO
SETUP
ACTION / USE
OBSERVABLE CHANGE
CONTEXT
CTA
```

Untuk routine atau storytelling, structure dapat mengikuti format tersebut tanpa memaksa demonstration pattern.

## 19. Storyboard Pattern

Storyboard dapat mendefinisikan:
- room state
- product state
- prop state
- character state
- action
- camera
- lighting
- observable change
- transition

Environment state perlu dipertahankan antar-reference.

## 20. Reference System

Reference State harus menangkap:
- room
- surface
- product
- product state
- important props
- character position
- camera
- lighting
- spatial relationship

Home content sering membutuhkan reference yang kuat karena background dan object placement mudah drift.

## 21. Common Category Failure Modes

### Room Drift
Layout ruangan berubah.

### Object Teleportation
Props berpindah tanpa action.

### Scale Drift
Product atau furniture berubah ukuran.

### Material Invention
Material product dibuat-buat.

### Capacity Overclaim
Visual container digunakan untuk mengklaim kapasitas tertentu.

### Before/After Manipulation
Lighting, framing, atau condition berbeda sehingga change terlihat misleading.

### Impossible Interaction
Object bergerak atau digunakan tanpa physical cause.

### Appliance Behavior Drift
Appliance melakukan fungsi yang tidak diketahui.

### Safety Drift
Generated scene menyiratkan penggunaan yang tidak aman.

### Product Identity Drift
Shape, controls, attachments, atau packaging berubah.

## 22. Best Format Pairings

Home category sering cocok dengan:
- **Demonstration:** observable household action.
- **Tutorial:** setup dan workflow.
- **Routine:** daily household use.
- **Problem-Solution:** contextual household problem.
- **Before/After:** visible organization or transformation.
- **Review:** use context dan observations.
- **Comparison:** product or configuration differences.
- **POV:** hands-on household interaction.

Pemilihan format tetap ditentukan oleh Content Strategy.

## 23. Non-Negotiable Rules

1. Environment adalah bagian dari visual continuity.
2. Product Identity harus konsisten.
3. Spatial relationship harus dijaga.
4. Product State hanya berubah melalui logical interaction.
5. Scale visual bukan measurement.
6. Material dan capacity tidak boleh diinvent.
7. Before/after harus memiliki comparable conditions jika digunakan sebagai evidence.
8. Appliance behavior harus sesuai dengan known product behavior.
9. Safety-relevant interaction harus physically plausible.
10. Props penting tidak boleh berubah tanpa narrative atau physical cause.
