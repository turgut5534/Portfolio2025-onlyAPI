    // Mobile sidebar toggle behavior
    (function(){
      const body = document.body;
      const hamburger = document.getElementById('hamburger');
      const overlay = document.getElementById('overlay');
      const sidebar = document.getElementById('sidebar');

      function openSidebar(){
        body.classList.add('sidebar--open');
        hamburger.setAttribute('aria-expanded','true');
        overlay.setAttribute('aria-hidden','false');
      }
      function closeSidebar(){
        body.classList.remove('sidebar--open');
        hamburger.setAttribute('aria-expanded','false');
        overlay.setAttribute('aria-hidden','true');
      }

      hamburger.addEventListener('click', function(e){
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        if(expanded) closeSidebar(); else openSidebar();
      });

      overlay.addEventListener('click', closeSidebar);

      // close with escape key
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeSidebar(); });

      // ensure sidebar is visible on wide screens if user resizes
      function handleResize(){
        if(window.matchMedia('(min-width: '+getComputedStyle(document.documentElement).getPropertyValue('--mobile-breakpoint')+'))').matches){
          // make sure it's visible and aria states are reset
          body.classList.remove('sidebar--open');
          hamburger.setAttribute('aria-expanded','false');
          overlay.setAttribute('aria-hidden','true');
        }
      }
      window.addEventListener('resize', handleResize);
      // run once
      handleResize();
    })();


    function openEditModal(id, title, grade) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    document.getElementById('editId').value = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editGrade').value = grade;
    document.getElementById('editSkillForm').action = '/admin/skills/update/' + id;
    }

    function closeEditModal() {
      const modal = document.getElementById('editModal');
      modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
      const modal = document.getElementById('editModal');
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }