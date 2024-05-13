using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;


namespace TodoApi.Controllers;

[Route("api/usuario")]
[ApiController]
public class TodoItemsController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoItemsController(TodoContext context)
    {
        _context = context;
    }

    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuarios>>> GetTodoUsuario()
    {
        return await _context.usuarios
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/TodoItems/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<Usuarios>> GetTodoUsuario(long id)
    {
        var todoItem = await _context.usuarios.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(todoItem);
    }
    // </snippet_GetByID>

    // PUT: api/TodoItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> GetTodoUsuario(long id, Usuarios todoDTO)
    {
        if (id != todoDTO.Id)
        {
            return BadRequest();
        }

        var todoItem = await _context.usuarios.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Name = todoDTO.Name;
        todoItem.Email = todoDTO.Email;
        todoItem.Senha = todoDTO.Senha;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/TodoItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<Usuarios>> GetTodoUsuario(Usuarios todoDTO)
    {
        var todoItem = new Usuarios
        {
            Email = todoDTO.Email,
            Name = todoDTO.Name,
            Senha = todoDTO.Senha
        };

        _context.usuarios.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTodoUsuario),
            new { id = todoItem.Id },
            ItemToDTO(todoItem));
    }
    // </snippet_Create>

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoUsuario(long id)
    {
        var todoItem = await _context.usuarios.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.usuarios.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(long id)
    {
        return _context.usuarios.Any(e => e.Id == id);
    }

    private static Usuarios ItemToDTO(Usuarios todoItem) =>
       new Usuarios
       {
           Id = todoItem.Id,
           Name = todoItem.Name,
           Email = todoItem.Email,
           Senha = todoItem.Senha
       };
}