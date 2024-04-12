document.addEventListener('DOMContentLoaded', function () {
    var formularioDatos = document.getElementById('formularioDatos');
    var formularioEliminar = document.getElementById('formularioEliminar');
    var formularioBuscar = document.getElementById('formularioBuscar');
    var formularioEditar = document.getElementById('formularioEditar');

    formularioEliminar.addEventListener('submit', function (event) {
        event.preventDefault();

        var cedulaEliminar = document.getElementById('idEliminarInput').value;
        eliminarPaciente(cedulaEliminar);
    });

    formularioDatos.addEventListener('submit', function (event) {
        event.preventDefault();

        var nombre = formularioDatos.elements.nombre.value;
        var apellidos = formularioDatos.elements.apellidos.value;
        var direccion = formularioDatos.elements.direccion.value;
        var telefono = formularioDatos.elements.telefono.value;
        var fechaNacimiento = formularioDatos.elements.fechaNacimiento.value;
        var edad = formularioDatos.elements.edad.value;
        var cedula = formularioDatos.elements.cedula.value;

        var problemasSalud = document.querySelector('input[name="problemasSalud"]:checked');
        var otrosProblemasSalud = formularioDatos.elements.otrosProblemasSalud.value;

        var datosFormulario = {
            nombre: nombre,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            fechaNacimiento: fechaNacimiento,
            edad: edad,
            cedula: cedula,
            problemasSalud: problemasSalud ? problemasSalud.value : null,
            otrosProblemasSalud: otrosProblemasSalud
        };

        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(datosFormulario);
        localStorage.setItem('registros', JSON.stringify(registros));

        console.log('Formulario enviado y almacenado localmente:', datosFormulario);
        formularioDatos.reset();
    });

    window.eliminarPaciente = function (cedulaEliminar) {
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        var indiceEliminar = -1;
        for (var i = 0; i < registros.length; i++) {
            if (registros[i].cedula === cedulaEliminar) {
                indiceEliminar = i;
                break;
            }
        }

        if (indiceEliminar !== -1) {
            registros.splice(indiceEliminar, 1);
            localStorage.setItem('registros', JSON.stringify(registros));
            console.log('Paciente con cédula', cedulaEliminar, 'eliminado con éxito.');
            alert("Eliminacion exitosa")
        } else {
            console.log('No se encontró un paciente con cédula', cedulaEliminar);
            alert("No se encontro el paciente")
        }
    };

    window.buscarPaciente = function () {
        var cedulaBuscar = document.getElementById('cedula').value;
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        var pacienteEncontrado = null;

        for (var i = 0; i < registros.length; i++) {
            if (registros[i].cedula === cedulaBuscar) {
                pacienteEncontrado = registros[i];
                break;
            }
        }

        mostrarResultadoBusqueda(pacienteEncontrado);
    };

    window.editarPaciente = function () {
        var cedulaEditar = document.getElementById('idPaciente').value;
        var nombreNuevo = document.getElementById('nombre').value;
        var fechaNacimientoNueva = document.getElementById('fechaNacimiento').value;
        var numeroCedulaNuevo = document.getElementById('numeroCedula').value;

        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        var pacienteEditar = null;

        for (var i = 0; i < registros.length; i++) {
            if (registros[i].cedula === cedulaEditar) {
                pacienteEditar = registros[i];
                break;
            }
        }

        if (pacienteEditar) {
            // Actualizar los datos del paciente
            pacienteEditar.nombre = nombreNuevo || pacienteEditar.nombre;
            pacienteEditar.fechaNacimiento = fechaNacimientoNueva || pacienteEditar.fechaNacimiento;
            pacienteEditar.cedula = numeroCedulaNuevo || pacienteEditar.cedula;

            // Guardar los cambios en el almacenamiento local
            localStorage.setItem('registros', JSON.stringify(registros));

            console.log('Paciente con cédula', cedulaEditar, 'editado con éxito.');
        } else {
            console.log('No se encontró un paciente con cédula', cedulaEditar);
        }
    };

    window.mostrarResultadoBusqueda = function (pacienteEncontrado) {
        var cuerpoTabla = document.getElementById('cuerpoTabla');
        cuerpoTabla.innerHTML = ''; // Limpiar el contenido actual de la tabla

        if (pacienteEncontrado) {
            var fila = document.createElement('tr');
            for (var propiedad in pacienteEncontrado) {
                if (pacienteEncontrado.hasOwnProperty(propiedad)) {
                    var celda = document.createElement('td');
                    celda.textContent = pacienteEncontrado[propiedad];
                    fila.appendChild(celda);
                }
            }
            cuerpoTabla.appendChild(fila);
        } else {
            // Mostrar un mensaje o tomar la acción apropiada si el paciente no se encuentra
            console.log('Paciente no encontrado');
        }
    };
});

