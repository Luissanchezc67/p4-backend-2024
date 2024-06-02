import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Crear algunos pacientes
  const paciente1 = await db.pacient.create({
    data: {
      pacient: 'Juan Perez',
      address: 'Calle Falsa 123',
      phonenum: '123456789',
      DNIPass: 'ABC123456',
      edad: '30',
      gender: 'M',
      record: 'Sin antecedentes',
    },
  });
  console.log(`Created patient with ID = ${paciente1.pacientId}`);

  const paciente2 = await db.pacient.create({
    data: {
      pacient: 'Ana Martinez',
      address: 'Avenida Siempre Viva 742',
      phonenum: '987654321',
      DNIPass: 'DEF789012',
      edad: '25',
      gender: 'F',
      record: 'Alergia a penicilina',
    },
  });
  console.log(`Created patient with ID = ${paciente2.pacientId}`);

  // Crear algunos doctores
  const doctor1 = await db.doctor.create({
    data: {
      firstname: 'Juan',
      lastname: 'Gonzalez',
      phone: '111222333',
      specialty: 'Cardiología',
    },
  });
  console.log(`Created doctor with ID = ${doctor1.doctorId}`);

  const doctor2 = await db.doctor.create({
    data: {
      firstname: 'Maria',
      lastname: 'Lopez',
      phone: '444555666',
      specialty: 'Dermatología',
    },
  });
  console.log(`Created doctor with ID = ${doctor2.doctorId}`);

  // Crear algunos servicios
  const servicio1 = await db.services.create({
    data: {
      service: 'Consulta General',
      description: 'Consulta médica general',
      price: '50.00',
    },
  });
  console.log(`Created service with ID = ${servicio1.serviceId}`);

  const servicio2 = await db.services.create({
    data: {
      service: 'Consulta Especialista',
      description: 'Consulta con especialista',
      price: '100.00',
    },
  });
  console.log(`Created service with ID = ${servicio2.serviceId}`);

  // Crear historial clínico para un paciente
  const historial1 = await db.clinicHistory.create({
    data: {
      pacientId: paciente1.pacientId,
      doctorId: doctor1.doctorId,
      serviceId: servicio1.serviceId,
      detail: {
        create: [
          {
            payment: 'Tarjeta',
            state: 'Pagado',
            serviceId: servicio1.serviceId, // Añadir serviceId
          },
        ],
      },
    },
  });
  console.log(`Created clinic history with ID = ${historial1.clinichistId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });