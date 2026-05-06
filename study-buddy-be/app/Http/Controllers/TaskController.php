<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return auth()->user()->tasks;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $validated['user_id'] = $request->user()->id;

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show(int $id)
    {
        $task = Task::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or unauthorized'], 404);
        }

        return $task;
    }

    public function update(Request $request, int $id)
    {
        $task = Task::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or unauthorized'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
            'deadline' => 'nullable|date',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(int $id)
    {
        $task = Task::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or unauthorized'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
